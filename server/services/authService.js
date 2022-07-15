const bcrypt = require('bcrypt');
const ErrorsConstants = require('../constants/errorsConstants');
const logger = require('../config/logger');
const roleService = require('../services/roleService');
const userService = require('../services/userService');
const RoleConstants = require('../constants/roleConstants');

class AuthService {
  static #encryptPassword(password) {
    return bcrypt.hashSync(password, 7);
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
