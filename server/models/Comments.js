const convertMongoToJSON = require('../utils/convert-mongo-to-json');
const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  author: {
    type: String
  },
  textarea: {
    type: String
  },
  date: {
    type: Date
  },
  isBestComment: {
    type: Boolean
  }
});

commentsSchema.plugin(convertMongoToJSON);

module.exports = mongoose.model('Comments', commentsSchema);
