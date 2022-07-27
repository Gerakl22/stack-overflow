const roleModel = require('../models/Role');

class RoleService {
  async getRole(roleConstant) {
    return roleModel.findOne({ role: roleConstant });
  }
}

module.exports = new RoleService();
