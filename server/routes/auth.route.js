const express = require('express');
const authController = require('../controllers/auth.controller');

router = express.Router();

router.post('/login', () => {

});
router.post('/logout', () => {

});
router.post('/sign-up', authController.signUp);

module.exports = router;

