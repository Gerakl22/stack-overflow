const tagsModel = require('../models/Tags');

class TagsService {
  async createTags(tags) {
    return await tagsModel.create({ tags });
  }

  async getTagsById(id) {
    return tagsModel.findById(id);
  }

  async findByIdAndUpdate(id, tags) {
    return tagsModel.findByIdAndUpdate({ _id: id }, {$set: {tags: tags}}, {new: true})
  }
}

module.exports = new TagsService();
