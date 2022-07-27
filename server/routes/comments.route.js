const express = require('express');
const commentsController = require('../controllers/comments.controller');

router = express.Router();

router.post('/create/:id', commentsController.createComment)

module.exports = router;
