const commentsService = require('../services/commentsService');
const httpStatus = require('http-status');
const logger = require('../config/logger');

class CommentsController {

  async createComment(req, res) {
    try {
      const comment = await commentsService.createComment(req.params.id, req.body);

      res.status(httpStatus.OK).send(comment);
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  async updateCommentById(req, res) {
    try {
      const comment = await commentsService.updateCommentById(req.params.id, req.body);

      res.status(httpStatus.OK).send(comment);
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

}

module.exports = new CommentsController();
