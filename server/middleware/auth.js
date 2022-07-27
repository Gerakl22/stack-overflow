const ErrorsConstants = require('../constants/errorsConstants');
const logger = require('../config/logger');
const TokenConstants = require('../constants/tokenConstants');
const tokenService = require('../services/tokenService');

const authToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization'];

    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);

      let accessToken = {
        accessToken: token
      }

      try {
         const isValidToken =  await tokenService.decodeToken(accessToken);

         if (!isValidToken) {
           logger.error('Token is not valid');

           next(new Error(ErrorsConstants.FORBIDDEN));
         }

         next();

      } catch (e) {
        logger.error(e.message);

        const currentAccessTokenModel = await tokenService.verifyToken(accessToken, TokenConstants.ACCESS);
        await tokenService.removeTokenModel(currentAccessTokenModel);

        next(throw new Error(ErrorsConstants.FORBIDDEN));
      }

    } else {
      logger.error('Bearer token missing');

      next(throw new Error(ErrorsConstants.FORBIDDEN));
    }
};

module.exports = {
  authToken
}
