const config = require('../config/config');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const moment = require('moment');
const ErrorConstants = require('../constants/errorsConstants');
const TokenConstants = require('../constants/tokenConstants');
const TokenModel = require('../models/Token');

class TokenService {

  static #generateToken(user, tokenExpires, tokenConstant) {
    const payload = {
      user_id: user.id,
      email: user.email,
      iat: moment().unix(),
      exp: tokenExpires.unix(),
      tokenConstant
    };

    return jwt.sign(payload, config.jwt.secret_key);
  }

  static async #saveToken(token, userId, expires, tokenConstant) {
    return await TokenModel.create({
      token,
      user: userId,
      expires: expires.toDate(),
      tokenConstant
    });
  }

  async decodeToken(token) {
    if (token && jwt.decode(token)) {
      const expiry = jwt.decode(token).exp;
      const now = new Date();

      return expiry * 1000 > now.getTime();
    }
    return false;
  }

  async generateAuthToken(user) {
    const accessTokenExpires = moment().add(config.jwt.access_expiration, 'minutes');
    const accessToken = TokenService.#generateToken(user, accessTokenExpires, TokenConstants.ACCESS);
    const refreshTokenExpires = moment().add(config.jwt.refresh_expiration, 'minutes');
    const refreshToken = TokenService.#generateToken(user, refreshTokenExpires, TokenConstants.REFRESH);
    await TokenService.#saveToken(refreshToken, user.id, refreshTokenExpires, TokenConstants.REFRESH);

    return {
      accessToken,
      refreshToken
    };
  }

  async getTokenModelByPopulateUser(token, tokenConstant) {
    return TokenModel.findOne({ token: token, tokenConstant: tokenConstant }).populate('user');
  }

  async removeTokenModel(tokenModel) {
    await tokenModel.remove();
  }

  async verifyToken(token, tokenConstant) {
    const payload = jwt.verify(token, config.jwt.secret_key);
    const currentTokenModel = TokenModel.findOne({ token, tokenConstant, user: payload.user_id });

    if (!currentTokenModel) {
      logger.error(ErrorConstants.AUTH.TOKEN_NOT_FOUND);

      throw new Error(ErrorConstants.AUTH.TOKEN_NOT_FOUND);
    }

    return currentTokenModel;

  }


}

module.exports = new TokenService();
