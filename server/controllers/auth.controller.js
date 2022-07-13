const logger = require('../config/logger');
const authService = require('../services/authService');


class AuthController {

  async signUp(req, res) {
    try {
      const user = await authService.signUp(req.body);

      res.send({user, message: 'User was register right now'});
    } catch (e) {
      logger.info(e.message);
      res.status(400).json({message: 'Registration failed'});
    }
  }
}

module.exports = new AuthController();
