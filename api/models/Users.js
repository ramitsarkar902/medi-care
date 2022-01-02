const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: {type: String, unique: true, required: true},
    pw: {type: String},
    token: {type: String},
  },
  {timestamp: true},
);

module.exports = mongoose.model('Users', userSchema);
