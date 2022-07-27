const convertMongoToJSON = require('../utils/convert-mongo-to-json');
const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
  tags: {
    type: [String],
    enum: ['Javascript', 'Java', 'Salesforce', '.Net']
  }
})

tagsSchema.plugin(convertMongoToJSON);


module.exports = mongoose.model('Tags', tagsSchema);
