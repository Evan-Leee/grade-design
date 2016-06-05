'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paperDetailSchema = new Schema({
  id: Number,
  name: String,
  questions:[Schema.Types.Mixed]

});

module.exports = mongoose.model('paperDetail', paperDetailSchema);
