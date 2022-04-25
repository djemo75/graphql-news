import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateNewsInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  imageUrl: string;

  @Field(() => [String])
  tags?: String[];
}

@InputType()
export class EditNewsInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => [String], { nullable: true })
  tags?: String[];
}
