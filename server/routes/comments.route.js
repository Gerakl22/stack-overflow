const express = require('express');
const commentsController = require('../controllers/comments.controller');

router = express.Router();

router.post('/create/:id', commentsController.createComment)
router.put('/update/:id', commentsController.updateCommentById)

module.exports = router;
