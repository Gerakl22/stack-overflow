const authService = require('../services/authService');
const tokenService = require('../services/tokenService');
const ErrorsConstants = require('../constants/errorsConstants');
const httpStatus = require('http-status');
const logger = require('../config/logger');

class AuthController {

  async decodeToken(req, res) {
    try {
      const isValidToken = await tokenService.decodeToken(req.body.access_token);

      res.status(httpStatus.OK).send({ isValidToken });
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.UNAUTHORIZED).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const user = await authService.login(req.body);
      const token = await tokenService.generateAuthToken(user);

      res.status(httpStatus.OK).send({ user, token, message: ErrorsConstants.AUTH.USER_AUTHORIZE });
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.UNAUTHORIZED).json({ message: e.message });
    }
  }

  async refreshToken(req, res) {
    try {
        const refreshToken = await authService.refreshToken(req.body.refresh_token);

        res.status(httpStatus.OK).send({token: refreshToken})
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.UNAUTHORIZED).json({ message: e.message });
    }
  }

  async signUp(req, res) {
    try {
      const user = await authService.signUp(req.body);
      const token = await tokenService.generateAuthToken(user);

      res.status(httpStatus.OK).send({ user, token, message: ErrorsConstants.AUTH.USER_REGISTER });
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.UNAUTHORIZED).json({ message: e.message });
    }
  }


}

module.exports = new AuthController();
