import { AuthChecker } from 'type-graphql';
import { TokenBlackListModel } from '../../entities/token-blacklist-entity';
import { Context } from '../../interfaces/context';
import { decodeAccessToken } from '../../utils/tokenUtils';

export const authChecker: AuthChecker<Context> = async ({
  context: { accessToken },
}) => {
  try {
    const data = decodeAccessToken(accessToken);
    const usedToken = await TokenBlackListModel.findOne({ token: accessToken });
    if (usedToken) {
      return false;
    }
    return true;
  } catch (error) {
    // token is invalid for some reason
    return false;
  }
};
