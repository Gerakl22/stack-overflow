const bcrypt = require('bcrypt');
const logger = require('../config/logger');
const roleModel = require('../models/Role');
const userModel = require('../models/User');

class AuthService {
  async signUp(user) {
    const { email, password } = user;
    const userExist = await userModel.findOne({ email });
    console.log(userExist);
    if (userExist) {
      // надо в res вывести ошибку, подумать как это переиграть
      throw new Error('User is already exist');
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const roleUser = await roleModel.findOne({ value: 'USER' });

    await userModel.create({ email, password: hashPassword, role: [roleUser.role] });

    logger.info(`${email} is register in database`)
  }
}

module.exports = new AuthService();
