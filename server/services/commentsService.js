const commentsModel = require('../models/Comments');
const questionsModel = require('../models/Questions');

class CommentsService {

  static async #createCommentsModel(comment) {
    return commentsModel.create({
      author: comment.author,
      date: comment.date,
      textarea: comment.textarea,
      isBestComment: comment.isBestComment
    });
  }

  static async #getCommentById(id) {
    return commentsModel.findById(id);
  }

  static async #setComment(id) {
    let currentCommentModelById = await CommentsService.#getCommentById(id);
    let date = new Date(currentCommentModelById.date).getTime();

    return {
      id: currentCommentModelById.id,
      date,
      author: currentCommentModelById.author,
      textarea: currentCommentModelById.textarea,
      isBestComment: currentCommentModelById.isBestComment
    };
  }

  async createComment(id, comment) {
    const commentModel = await CommentsService.#createCommentsModel(comment);

    const questionModel = await questionsModel.findByIdAndUpdate({ _id: id }, { $push: { comments: commentModel.id } }, { new: true });
    await questionModel.save();

    return await CommentsService.#setComment(commentModel.id);
  }

  async removeComments(comments) {
    if (comments === null) {
      return comments;
    }

    for (let commentId of comments) {
      let currentCommentModelById = await CommentsService.#getCommentById(commentId);

      currentCommentModelById.remove();
    }
  }

  async setComments(commentsId) {
    const comments = [];

    for (let commentId of commentsId) {
      const setComment = await CommentsService.#setComment(commentId);

      comments.push(setComment);
    }

    if (comments.length > 0) {
      return comments;
    } else {
      return null;
    }
  }

  async updateCommentById(id, body) {
    const commentModelById = await commentsModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          author: body.author,
          textarea: body.textarea,
          date: body.date,
          isBestComment: body.isBestComment
        }
      },
      { new: true }
    );

    return await CommentsService.#setComment(commentModelById._id);
  }

}

module.exports = new CommentsService();
