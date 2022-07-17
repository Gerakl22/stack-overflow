const express = require('express');
const authController = require('../controllers/auth.controller');

router = express.Router();

router.post('/decode-token', authController.decodeToken);
router.post('/login', authController.login);
router.post('/logout', () => {

});
router.post('/refresh-token', authController.refreshToken);
router.post('/sign-up', authController.signUp);

module.exports = router;

