'use strict';

var apiRequest = require('../services/api-request');
var constant = require('../mixin/constant');
var logicPuzzle = require('../models/logic-puzzle');

function TestController () {

}
TestController.prototype.isDetailed = (req, res, next) => {
  var userId = req.session.user.id;
  var uri = 'users/' + userId + '/detail';
  apiRequest.get(uri, function (err, resp) {
    if (err) {
      return next(err);
    } else if (resp === undefined) {
      res.send({
        status: constant.httpCode.INTERNAL_SERVER_ERROR
      });
    } else if (resp.status === constant.httpCode.OK) {
      res.send({
        data: true
      });
    } else if (resp.status === constant.httpCode.NOT_FOUND) {
      res.send({
        data: false
      });
    } else {
      res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
      res.send({
        status: constant.httpCode.INTERNAL_SERVER_ERROR
      });
    }
  });
};

TestController.prototype.isPaperCommitted = (req, res, next) => {
  var userId = req.session.user.id;

  logicPuzzle.isPaperCommited(userId, function (err, data) {
    if (err) {
      return next(err);
    } else {
      res.send({isPaperCommitted: data});
    }
  });
};

module.exports = TestController;
