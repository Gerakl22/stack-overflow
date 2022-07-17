const userModel = require('../models/User');

class UserService {

  async getUserByEmail(email) {
    return userModel.findOne({ email });
  }

  async getUserById(id) {
    return userModel.findOne(id);
  }

  async createUser(email, encryptPassword, role) {
    return userModel.create({ email, password: encryptPassword, role: role });
  }
}

module.exports = new UserService();
