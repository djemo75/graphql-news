import { Resolver, Mutation, Args, Authorized, Ctx } from 'type-graphql';
import { UserModel } from '../../entities/user-entity';
import { LoginArguments } from './auth-arguments';
import { UserInputError } from 'apollo-server-core';
import { comparePasswords } from '../../utils/passwordUtils';
import { generateAccessToken } from '../../utils/tokenUtils';
import { Context } from '../../interfaces/context';
import { TokenBlackListModel } from '../../entities/token-blacklist-entity';

@Resolver()
export class AuthResolver {
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

  @Authorized()
  @Mutation(() => String)
  async logout(@Ctx() ctx: Context): Promise<string> {
    const addedToken = new TokenBlackListModel({ token: ctx.accessToken });
    await addedToken.save();

    return 'You logged out successfully!';
  }
}
