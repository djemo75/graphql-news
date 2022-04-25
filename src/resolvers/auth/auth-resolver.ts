import { Resolver, Query, Mutation, Args, Ctx } from 'type-graphql';
import { User, UserModel } from '../../entities/user-entity';
import { LoginArguments } from './auth-arguments';
import { UserInputError, AuthenticationError } from 'apollo-server-core';
import { comparePasswords } from '../../utils/passwordUtils';
import { generateAccessToken } from '../../utils/tokenUtils';

@Resolver()
export class AuthResolver {
  //   @Query(returns => User)
  //   async currentUser(@Ctx() ctx: Context):Promise<User> {
  //     if(!ctx.user) {
  //         throw new AuthenticationError('user_not_authenticated');
  //     }
  //     return await UserModel.findById(ctx.user._id)
  //   }

  @Mutation(() => String)
  async login(@Args() { username, password }: LoginArguments): Promise<string> {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new UserInputError('Wrong username or password');
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      throw new UserInputError('Wrong username or password');
    }

    return generateAccessToken(user);
  }
}
