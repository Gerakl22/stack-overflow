const convertMongoToJSON = require('../utils/convert-mongo-to-json');
const mongoose = require('mongoose');
const TokenConstants = require('../constants/tokenConstants');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  tokenConstant: {
    type: String,
    enum: [TokenConstants.ACCESS, TokenConstants.REFRESH],
    required: true
  },
  expires: {
    type: Date,
    required: true
  }

}, { timestamps: true });

tokenSchema.plugin(convertMongoToJSON);

module.exports = mongoose.model('Token', tokenSchema);
