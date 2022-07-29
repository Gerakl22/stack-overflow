const express = require('express');
const questionsController = require('../controllers/questions.controller');

router = express.Router();

router.get('/all', questionsController.getAllQuestions)
      .post('/all', questionsController.createQuestion)

router.get('/approve/:id', questionsController.approveQuestionById)
router.get('/open/:id', questionsController.getQuestionById)
router.delete('/remove/:id', questionsController.removeQuestionById)
router.put('/update/:id', questionsController.updateQuestionById)



module.exports = router;
