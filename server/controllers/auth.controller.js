const authService = require('../services/authService');
const httpStatus = require('http-status');
const logger = require('../config/logger');
const tokenService = require('../services/tokenService');
const SuccessConstants = require('../constants/successConstants');

class AuthController {

  async login(req, res) {
    try {
      const user = await authService.login(req.body);
      const token = await tokenService.generateAuthToken(user);

      res.status(httpStatus.OK).send({ user, token, message: SuccessConstants.AUTH.USER_AUTHORIZE });
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.UNAUTHORIZED).json({ message: e.message });
    }
  }

  async logout(req, res) {
    try {
      await authService.logout(req.body.refreshToken);

      res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = await authService.refreshToken(req.body.refreshToken);

      res.status(httpStatus.OK).send({ token: refreshToken });
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.UNAUTHORIZED).json({ message: e.message });
    }
  }

  async signUp(req, res) {
    try {
      const user = await authService.signUp(req.body);
      const token = await tokenService.generateAuthToken(user);

      res.status(httpStatus.OK).send({ user, token, message: SuccessConstants.AUTH.USER_REGISTER });
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.UNAUTHORIZED).json({ message: e.message });
    }
  }

}

module.exports = new AuthController();
