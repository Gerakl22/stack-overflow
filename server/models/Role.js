const convertMongoToJSON = require('../utils/convert-mongo-to-json');
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: { type: String, default: 'USER' }
});

roleSchema.plugin(convertMongoToJSON);

module.exports = mongoose.model('Role', roleSchema);
