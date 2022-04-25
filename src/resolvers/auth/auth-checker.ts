import { AuthChecker } from 'type-graphql';
import { Context } from '../../interfaces/context';
import { decodeAccessToken } from '../../utils/tokenUtils';

export const authChecker: AuthChecker<Context> = ({
  context: { accessToken },
}) => {
  try {
    const data = decodeAccessToken(accessToken);
    return true;
  } catch (error) {
    // token is invalid for some reason
    return false;
  }
};
