import { Request } from 'express';
import { AccessTokenData } from '../utils/tokenUtils';

export interface Context {
  req: Request;
  accessToken: string;
  tokenData: null | AccessTokenData;
}
