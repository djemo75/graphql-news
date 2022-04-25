import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user/user-resolver';
import { AuthResolver } from './resolvers/auth/auth-resolver';
import { NewsResolver } from './resolvers/news/news-resolver';
import { TypegooseMiddleware } from './typegoose-middleware';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from './object-id.scalar';
import { authChecker } from './resolvers/auth/auth-checker';

import * as path from 'path';

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver, NewsResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    // use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    authChecker,
  });
  return schema;
};
