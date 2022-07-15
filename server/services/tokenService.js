const config = require('../config/config');
const jwt = require('jsonwebtoken');
const moment = require('moment');
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

}

module.exports = new TokenService();
