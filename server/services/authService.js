const bcrypt = require('bcrypt');
const logger = require('../config/logger');
const roleService = require('../services/roleService');
const tokenService = require('../services/tokenService');
const userService = require('../services/userService');
const ErrorsConstants = require('../constants/errorsConstants');
const TokenConstants = require('../constants/tokenConstants');
const RoleConstants = require('../constants/roleConstants');

class AuthService {
  static #encryptPassword(password) {
    return bcrypt.hashSync(password, 7);
  }

  static async #isCorrectEmail(email) {
    const userByEmail = await userService.getUserByEmail(email);

    if (userByEmail) {
      return email === userByEmail.email;
    }

    return false;
  }

  static async #isCorrectPassword(email, password) {
    const userByEmail = await userService.getUserByEmail(email);

    if (userByEmail && password) {
      return bcrypt.compareSync(password, userByEmail.password);
    }

    return false;
  }

  async login(user) {
    const { email, password } = user;

    const isCorrectEmail = await AuthService.#isCorrectEmail(email);
    const isCorrectPassword = await AuthService.#isCorrectPassword(email, password);

    if (isCorrectEmail && isCorrectPassword) {
      const user = await userService.getUserByEmail(email);

      return {
        id: user.id,
        email: user.email,
        role: user.role
      };
    } else {
      throw new Error(ErrorsConstants.AUTH.USER_NOT_CORRECT_EMAIL_AND_PASSWORD);
    }
  }

  async refreshToken(token) {
    const currentRefreshTokenModel = await tokenService.verifyToken(token, TokenConstants.REFRESH);
    const user = await userService.getUserById(currentRefreshTokenModel.user)

    if(!user) {
      logger.error(ErrorsConstants.AUTH.USER_IS_NOT_FOUND)

      throw new Error(ErrorsConstants.AUTH.USER_IS_NOT_FOUND);
    }

    await currentRefreshTokenModel.remove();

    return await tokenService.generateAuthToken(user);
  }

  async signUp(user) {
    const { email, password } = user;
    const userExist = await userService.getUserByEmail(email);

    if (userExist) {
      throw new Error(ErrorsConstants.AUTH.USER_EXIST);
    }

    const encryptPassword = AuthService.#encryptPassword(password);
    const roleUser = await roleService.getRole(RoleConstants.USER);

    const newUser = await userService.createUser(email, encryptPassword, roleUser.role);
    logger.info(`${email} is register in database`);

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    };
  }

}

module.exports = new AuthService();
