'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paperSchema = new Schema({
  id: Number,
  img: String,
  name: String,
  desc: {
    heading: String,
    content: String
  }
});

module.exports = mongoose.model('ContestPaper', paperSchema);
