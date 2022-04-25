import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getConfig } from '../configs/config';
import { User } from '../entities/user-entity';

const { JWT_SECRET, TOKEN_EXPIRATION } = getConfig();

export interface AccessTokenData {
  _id: ObjectId;
  username: string;
}

const generateAccessToken = (user: User) => {
  const payload: AccessTokenData = {
    _id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION || '1d',
  });
};

const extractTokenFromHeader = (headerValue: string | undefined | null) => {
  if (!headerValue) {
    return null;
  }

  const [type, token] = headerValue.split(' ');
  if (type === 'Token' && token) {
    return token;
  }
  return null;
};

const decodeAccessToken = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

export { generateAccessToken, extractTokenFromHeader, decodeAccessToken };
