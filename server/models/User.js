const convertMongoToJSON = require('../utils/convert-mongo-to-json');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: {type: String, required: true, minLength: 6},
  role: {type: String, ref: 'Role'}

});

userSchema.plugin(convertMongoToJSON);

module.exports = mongoose.model('User', userSchema);
