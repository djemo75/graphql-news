import { ObjectType, Field } from 'type-graphql';
import {
  prop as Prop,
  getModelForClass,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { News } from './news-entity';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

  @Prop({ required: true })
  @Field()
  username: string;

  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ required: true })
  @Field()
  password: string;

  @Field(() => [News])
  @Prop({ default: [] })
  news?: News[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
