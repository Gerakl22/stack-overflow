const convertMongoToJSON = require('../utils/convert-mongo-to-json');
const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    textarea: {
      type: String,
      required: true
    },
    tags: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tags',
      required: true
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }],
    isApproval: {
      type: Boolean,
      required: true
    }
})

questionsSchema.plugin(convertMongoToJSON);

module.exports = mongoose.model('Questions', questionsSchema);
