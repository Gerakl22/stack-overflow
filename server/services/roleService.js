
const roleModel = require('../models/Role');

class RoleService {
  async getRole(roleConstant) {
    return roleModel.findOne({ value: roleConstant });
  }
}

module.exports = new RoleService();
