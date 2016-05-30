'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number,
  role: Number,
  mobilePhone: Number,
  email: String,
  password: String
});

module.exports = mongoose.model('user', userSchema);
