import { UserInputError } from 'apollo-server-core';
import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { User, UserModel } from '../../entities/user-entity';
import { Context } from '../../interfaces/context';
import { encryptPassword } from '../../utils/passwordUtils';
import { CreateUserInput, EditUserInput } from './user-arguments';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find({});
  }

  @Query(() => User)
  async user(@Arg('_id') _id: string): Promise<User> {
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new UserInputError('User not found!');
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const existingUser = await UserModel.findOne({ username: data.username });
    if (existingUser) {
      throw new UserInputError('Username is already used!');
    }

    const userData = { ...data, password: encryptPassword(data.password) };
    const newUser = new UserModel(userData);
    await newUser.save();
    return newUser;
  }

  @Authorized()
  @Mutation(() => User)
  async editUser(
    @Arg('_id') _id: string,
    @Arg('data') data: EditUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const existingUser = await UserModel.findOne({ _id });
    if (!existingUser) {
      throw new UserInputError('User not found!');
    }

    if (existingUser._id != ctx.tokenData._id) {
      throw new UserInputError('Can not edit other user!');
    }

    const userData = data.password
      ? { ...data, password: encryptPassword(data.password) }
      : data;
    return await UserModel.findByIdAndUpdate(_id, userData, { new: true });
  }

  @Authorized()
  @Mutation(() => User)
  async deleteUser(
    @Arg('_id') _id: string,
    @Ctx() ctx: Context
  ): Promise<User> {
    const existingUser = await UserModel.findOne({ _id });
    if (!existingUser) {
      throw new UserInputError('User not found!');
    }

    if (existingUser._id != ctx.tokenData._id) {
      throw new UserInputError('Can not delete other user!');
    }

    return await UserModel.findByIdAndRemove(_id);
  }
}
