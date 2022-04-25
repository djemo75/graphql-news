import dotenv from 'dotenv';
dotenv.config();

interface Config {
  GRAPHQL_PATH: string;
  PORT: string;
  MONGODB_URL: string;
  JWT_SECRET: string;
  TOKEN_EXPIRATION: string;
}

export const getConfig = (): Config => {
  return {
    GRAPHQL_PATH: process.env.GRAPHQL_PATH,
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
  };
};
