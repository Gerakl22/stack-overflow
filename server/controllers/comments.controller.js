const commentsService = require('../services/commentsService');
const httpStatus = require('http-status');
const logger = require('../config/logger');
const SuccessConstants = require('../constants/successConstants');

class CommentsController {

  async createComment(req, res) {
    try {
      await commentsService.createComment(req.params.id, req.body);

      res.status(httpStatus.OK).send({message: SuccessConstants.COMMENTS.COMMENT_WAS_CREATED})
    } catch (e) {
      logger.error(e.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }
}

module.exports = new CommentsController();
