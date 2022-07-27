const commentsModel = require('../models/Comments');
const logger = require('../config/logger');
const ErrorsConstants = require('../constants/errorsConstants');
const questionsService = require('../services/questionsService');
const questionsModel = require('../models/Questions');

class CommentsService {

  async setComment(commentsModel) {
    const comments = [];

    for (let comment of commentsModel) {
      let currentCommentModelById = await this.getCommentById(comment);
      let date = new Date(currentCommentModelById.date).getTime();

      comments.push({
        id: currentCommentModelById.id,
        date,
        author: currentCommentModelById.author,
        textarea: currentCommentModelById.textarea,
        isBestComment: currentCommentModelById.isBestComment
      });
    }

    if (comments.length > 0) {
      return comments;
    } else {
      return null;
    }
  }

  async createComment(id, comment) {
    const commentModel = await commentsModel.create({
      author: comment.author,
      date: comment.date,
      textarea: comment.textarea,
      isBestComment: comment.isBestComment
    });

    const questionModel = await questionsModel.findByIdAndUpdate({ _id: id }, { $push: { comments: commentModel.id } }, { new: true });
    await questionModel.save();

    return commentModel;
  }

  async getCommentById(id) {
    return commentsModel.findById(id);
  }

}

module.exports = new CommentsService();
