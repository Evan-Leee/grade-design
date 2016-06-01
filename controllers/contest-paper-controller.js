'use strict';

var ContestPaper = require('../models/contest-paper');
var util = require('util');
var async = require('async');

function ContestPaperController () {

}

ContestPaperController.prototype.initPaperList = function (req, res){
  var offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  var perPage = req.query.perPage ? parseInt(req.query.perPage, 10) : 0;
  var nextOffset = offset + perPage;
  var previousOffset = (offset - perPage < 1) ? 0 : offset - perPage;

  var total;
  async.waterfall([
    (done) => {
      ContestPaper.find({}, done)
    },(data,done) => {
      total = data.length;
      var items = data.slice(offset, offset + perPage);
      done(null, items);
    }
  ],(err, data) => {
    var result = {
      next: util.format('?perPage=%s&offset=%s', perPage, nextOffset),
      offset: offset,
      prev: util.format('?perPage=%s&offset=%s', perPage, previousOffset),
      total: total
    };
    res.send({
      pageInfo: result,
      papers: data
    })
  });
};

module.exports = ContestPaperController;