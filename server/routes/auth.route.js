const authController = require('../controllers/auth.controller');
const express = require('express');

router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/sign-up',  authController.signUp);

module.exports = router;

