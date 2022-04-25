import { MinLength, MaxLength } from 'class-validator';
import { Field, ArgsType } from 'type-graphql';

@ArgsType()
export class LoginArguments {
  @Field()
  @MaxLength(50, { message: 'Username can have maximum 30 characters!' })
  username: string;

  @Field()
  @MinLength(6, { message: 'Password should be minimum 6 characters!' })
  password: string;
}
