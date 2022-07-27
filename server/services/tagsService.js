const tagsModel = require('../models/Tags');

class TagsService {
  async createTags(tags) {
    return await tagsModel.create({ tags });
  }

  async getTagsById(id) {
    return tagsModel.findById(id);
  }
}

module.exports = new TagsService();
