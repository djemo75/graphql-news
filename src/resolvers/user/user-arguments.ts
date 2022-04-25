import { MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { CreateNewsInput } from '../news/news-arguments';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(50, { message: 'Username can have maximum 30 characters!' })
  username: string;

  @Field()
  @MaxLength(50, { message: 'FirstName can have maximum 30 characters!}' })
  firstName: string;

  @Field()
  @MaxLength(50, { message: 'LastName can have maximum 30 characters!' })
  lastName: string;

  @Field()
  @MinLength(6, { message: 'Password should be minimum 6 characters!' })
  password: string;
}

@InputType()
export class EditUserInput {
  @Field({ nullable: true })
  @MaxLength(30)
  firstName?: string;

  @Field({ nullable: true })
  @MaxLength(30)
  lastName?: string;

  @Field({ nullable: true })
  @MinLength(6)
  password?: string;

  @Field(() => [CreateNewsInput], { nullable: true })
  news?: CreateNewsInput[];
}
