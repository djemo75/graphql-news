import { UserInputError } from 'apollo-server-core';
import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { News, NewsModel } from '../../entities/news-entity';
import { CreateNewsInput, EditNewsInput } from './news-arguments';

@Resolver()
export class NewsResolver {
  @Query(() => [News])
  async allNews(): Promise<News[]> {
    return await NewsModel.find({});
  }

  @Query(() => News)
  async news(@Arg('_id') _id: string): Promise<News> {
    const news = await NewsModel.findById(_id);
    if (!news) {
      throw new UserInputError('News not found!');
    }

    return news;
  }

  @Authorized()
  @Mutation(() => News)
  async createNews(@Arg('data') data: CreateNewsInput): Promise<News> {
    const newNews = new NewsModel(data);
    await newNews.save();
    return newNews;
  }

  @Authorized()
  @Mutation(() => News)
  async editNews(
    @Arg('_id') _id: string,
    @Arg('data') data: EditNewsInput
  ): Promise<News> {
    const existingNews = await NewsModel.findOne({ _id });
    if (!existingNews) {
      throw new UserInputError('News not found!');
    }

    return await NewsModel.findByIdAndUpdate(_id, data, { new: true });
  }

  @Authorized()
  @Mutation(() => News)
  async deleteNews(@Arg('_id') _id: string): Promise<News> {
    const existingNews = await NewsModel.findOne({ _id });
    if (!existingNews) {
      throw new UserInputError('News not found!');
    }

    return await NewsModel.findByIdAndRemove(_id);
  }
}
