const commentService = require('../services/commentsService');
const ErrorsConstants = require('../constants/errorsConstants');
const logger = require('../config/logger');
const tagsService = require('../services/tagsService');
const questionsModel = require('../models/Questions');

class QuestionsService {

  static async #setAllQuestions(allQuestionsModel) {
    const allQuestions = [];

    for (let questionModelById of allQuestionsModel) {
      const setQuestion = await QuestionsService.#setQuestion(questionModelById);

      allQuestions.push(setQuestion);
    }

    return allQuestions;
  }

  static async #setQuestion(questionModelById) {
    let currentTagsModelById = await tagsService.getTagsById(questionModelById.tags);

    if (!currentTagsModelById) {
      logger.error(ErrorsConstants.QUESTIONS.TAGS_NOT_FOUND);

      throw new Error(ErrorsConstants.QUESTIONS.TAGS_NOT_FOUND);
    }

    const date = new Date(questionModelById.date).getTime();
    const comments = await commentService.setComment(questionModelById.comments);

    return {
      id: questionModelById.id,
      date,
      author: questionModelById.author,
      title: questionModelById.title,
      textarea: questionModelById.textarea,
      tags: currentTagsModelById.tags,
      comments,
      isApproval: questionModelById.isApproval
    };
  }

  async approveQuestionById(id) {
    await questionsModel.findByIdAndUpdate({ _id: id }, { $set: { isApproval: true } });

    return await this.getAllQuestions();
  }

  async createQuestion(question) {
    const tags = await tagsService.createTags(question.tags);

    return await questionsModel.create(
      {
        date: question.date,
        author: question.author,
        title: question.title,
        textarea: question.textarea,
        tags: tags._id,
        isApproval: question.isApproval
      }
    );
  }

  async getAllQuestions() {
    const allQuestionsModel = await questionsModel.find();

    return await QuestionsService.#setAllQuestions(allQuestionsModel);
  }

  async getQuestionById(id) {
    const questionModelById = await this.getQuestionModelById(id);

    if (!questionModelById) {
      logger.error(ErrorsConstants.QUESTIONS.QUESTION_NOT_FOUND);

      throw new Error(ErrorsConstants.QUESTIONS.QUESTION_NOT_FOUND);
    }

    return await QuestionsService.#setQuestion(questionModelById);
  }

  async getQuestionModelById(id) {
    return questionsModel.findById(id);
  }

  async removeQuestionById(id) {
    const questionModelById = await this.getQuestionModelById(id);

    if (!questionModelById) {
      logger.error(ErrorsConstants.QUESTIONS.QUESTION_NOT_FOUND);

      throw new Error(ErrorsConstants.QUESTIONS.QUESTION_NOT_FOUND);
    }

    const tagsModelById = await tagsService.getTagsById(questionModelById.tags);

    if (!tagsModelById) {
      logger.error(ErrorsConstants.QUESTIONS.TAGS_NOT_FOUND);

      throw new Error(ErrorsConstants.QUESTIONS.TAGS_NOT_FOUND);
    }

    if (questionModelById && tagsModelById) {
      await tagsModelById.remove();
      await questionModelById.remove();
    }

    return await this.getAllQuestions();
  }
}

module.exports = new QuestionsService();
