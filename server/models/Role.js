const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: { type: String, default: 'USER' }
});

module.exports = mongoose.model('Role', roleSchema);
