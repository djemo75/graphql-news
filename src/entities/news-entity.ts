import { ObjectType, Field } from 'type-graphql';
import {
  prop as Prop,
  getModelForClass,
  Severity,
  modelOptions,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class News {
  @Field()
  readonly _id: ObjectId;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  content: string;

  @Prop({ required: true })
  @Field()
  imageUrl: string;

  @Field(() => [String])
  @Prop({ default: [] })
  tags?: String[];
}

export const NewsModel = getModelForClass(News, {
  schemaOptions: { timestamps: true },
});
