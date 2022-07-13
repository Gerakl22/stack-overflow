const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: {type: String, required: true, minLength: 6},
  role: [{type: String, ref: 'Role'}]

});

module.exports = mongoose.model('User', userSchema);
