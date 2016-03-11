var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String
  },

  password: {
    type: String
  }
})

module.exports = mongoose.module('user', UserSchema)