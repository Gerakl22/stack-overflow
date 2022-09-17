const commentService = require('../services/commentsService');
const ErrorsConstants = require('../constants/errorsConstants');
const logger = require('../config/logger');
const tagsService = require('../services/tagsService');
const questionsModel = require('../models/Questions');

class QuestionsService {

  static async #createQuestionsModel(question, tags) {
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

  static async #getQuestionModelById(id) {
    return questionsModel.findById(id);
  }

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
    const comments = await commentService.setComments(questionModelById.comments);

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

    const questionModelById = await QuestionsService.#getQuestionModelById(id);

    return await QuestionsService.#setQuestion(questionModelById);
  }

  async createQuestion(question) {
    const tags = await tagsService.createTags(question.tags);

    return await QuestionsService.#createQuestionsModel(question, tags);
  }

  async getAllQuestions() {
    const allQuestionsModel = await questionsModel.find();

    return await QuestionsService.#setAllQuestions(allQuestionsModel);
  }

  async getQuestionById(id) {
    const questionModelById = await QuestionsService.#getQuestionModelById(id);

    if (!questionModelById) {
      logger.error(ErrorsConstants.QUESTIONS.QUESTION_NOT_FOUND);

      throw new Error(ErrorsConstants.QUESTIONS.QUESTION_NOT_FOUND);
    }

    return await QuestionsService.#setQuestion(questionModelById);
  }

  async removeQuestionById(id) {
    const questionModelById = await QuestionsService.#getQuestionModelById(id);

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
      await commentService.removeComments(questionModelById.comments);
      await questionModelById.remove();
    }

    return await this.getAllQuestions();
  }

  async updateQuestionById(id, body) {
    const questionModelById = await questionsModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          date: body.date,
          author: body.author,
          title: body.title,
          textarea: body.textarea,
          isApproval: body.isApproval
        }
      },
      { new: true }
    );

    await tagsService.findByIdAndUpdate(questionModelById.tags, body.tags);

    return await QuestionsService.#setQuestion(questionModelById);
  }
}

module.exports = new QuestionsService();
