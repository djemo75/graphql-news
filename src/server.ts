import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import express from 'express';
import jwt from 'express-jwt';
import 'reflect-metadata';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getSchema } from './schema';
import { Context } from './interfaces/context';
import { getConfig } from './configs/config';
import { decodeAccessToken, extractTokenFromHeader } from './utils/tokenUtils';

const { GRAPHQL_PATH, PORT, MONGODB_URL, JWT_SECRET } = getConfig();

const auth = jwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: false,
});

mongoose
  .connect(MONGODB_URL, { autoIndex: true })
  .then(() => console.log('connected to mongodb'))
  .catch(console.log);

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(GRAPHQL_PATH, cors({ origin: '*' }), bodyParser.json(), auth);

  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    introspection: true,
    context: ({ req }) => {
      const accessToken = extractTokenFromHeader(req.headers.authorization);
      let tokenData = null;
      try {
        tokenData = decodeAccessToken(accessToken);
      } catch (error) {
        tokenData = null;
      }

      const context: Context = {
        req,
        accessToken,
        tokenData,
      };
      return context;
    },
  });
  await server.start();

  server.applyMiddleware({ app, path: GRAPHQL_PATH });
  httpServer.listen({ port: PORT });

  console.log(`Server started at http://localhost:${PORT}/${GRAPHQL_PATH}`);
  return { server, app };
};

startApolloServer();
