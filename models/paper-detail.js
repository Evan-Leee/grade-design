'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paperDetailSchema = new Schema({
  id: Number,
  questions:[{
    id: String,
    type: String,
    desc: String,
    img: String,
    option: {
      number: Number,
      content: {
        A: String,
        B: String,
        C: String,
        D: String
      }
    },
    score: Number,
    stdAnswer: String
  }]

});

module.exports = mongoose.model('paperDetail', paperDetailSchema);
