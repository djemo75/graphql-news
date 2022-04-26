import { ObjectType, Field } from 'type-graphql';
import { prop as Prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

@ObjectType()
export class TokenBlackList {
  @Field()
  readonly _id: ObjectId;

  @Prop({ required: true })
  @Field()
  token: string;
}

export const TokenBlackListModel = getModelForClass(TokenBlackList, {
  schemaOptions: { timestamps: true },
});
