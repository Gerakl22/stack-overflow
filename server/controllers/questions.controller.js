const httpStatus = require('http-status');
const logger = require('../config/logger');
const SuccessConstants = require('../constants/successConstants');
const questionsService = require('../services/questionsService');

class QuestionsController {
  async approveQuestionById(req, res) {
    try {
      const allQuestions = await questionsService.approveQuestionById(req.params.id);

      res.status(httpStatus.OK).send(allQuestions);
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  async createQuestion(req, res) {
    try {
      await questionsService.createQuestion(req.body);

      res.status(httpStatus.OK).send({ message: SuccessConstants.QUESTIONS.QUESTION_WAS_CREATED });
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  async getAllQuestions(req, res) {
    try {
      const allQuestions = await questionsService.getAllQuestions();

      res.status(httpStatus.OK).send(allQuestions);
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  async getQuestionById(req, res) {
    try {
      const question = await questionsService.getQuestionById(req.params.id);

      res.status(httpStatus.OK).send(question);

    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  async removeQuestionById(req, res) {
    try {
      const allQuestions = await questionsService.removeQuestionById(req.params.id);

      res.status(httpStatus.OK).send(allQuestions);
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  async updateQuestionById(req, res) {
    try {
      const question = await questionsService.updateQuestionById(req.params.id, req.body);

      res.status(httpStatus.OK).send(question);
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }
}

module.exports = new QuestionsController();
