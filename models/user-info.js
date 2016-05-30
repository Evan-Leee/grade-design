'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfoSchema = new Schema({
  userId: Number,
  school: String,
  schoolProvince: String,
  schoolCity: String,
  name: String,
  mobilePhone: Number,
  email: String,
  gender: String,
  major: String,
  degree: String,
  entranceYear: String
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
