'use strict';

var mongoose = require('mongoose');
var constant = require('../mixin/constant');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load('./config/config.yml');

var _timeBase = 90;
var Schema = mongoose.Schema;

var logicPuzzleSchema = new Schema({
  userId: Number,
  quizItems: [{
    id: Number,
    question: String,
    description: String,
    chartPath: String,
    initializedBox: String,
    userAnswer: String
  }],
  quizExamples: [{
    id: Number,
    question: String,
    answer: String,
    description: String,
    chartPath: String,
    initializedBox: String
  }],
  sections: [{
    sectionId: Number,
    startTime: Number,
    endTime: Number
  }],
  blankQuizId: Number,
  paperId: Number,
  isCommited: Boolean
});

logicPuzzleSchema.statics.isPaperCommited = function (userId, callback) {
  var isPaperCommited;

  this.findOne({userId: userId}, (err, logicPuzzle) => {
    if (err || !logicPuzzle) {
      isPaperCommited = false;
    } else {
      var TOTAL_TIME = _timeBase * constant.time.MINUTE_PER_HOUR;

      var startTime = logicPuzzle.startTime || Date.parse(new Date()) / constant.time.MILLISECOND_PER_SECONDS;
      var now = Date.parse(new Date()) / constant.time.MILLISECOND_PER_SECONDS;

      var usedTime = now - startTime;

      isPaperCommited = logicPuzzle.isCommited || parseInt(TOTAL_TIME - usedTime) <= 0 ? true : false;
    }

    callback(err, isPaperCommited);
  });
};

logicPuzzleSchema.statics.getLogicPuzzle = function (orderId, userId) {
  var userAnswer;
  var itemsCount;

  return this.findOne({userId: userId})
      .then(function (data) {
        data.quizExamples.forEach(function (example) {
          example.isExample = true;
        });
        data.quizItems.forEach(function (item) {
          item.isExample = false;
        });
        var quizAll = data.quizExamples.concat(data.quizItems);
        itemsCount = quizAll.length;
        return quizAll;
      })
      .then(function (quizAll) {
        userAnswer = quizAll[orderId].userAnswer || quizAll[orderId].answer || null;
        return {
          item: {
            id: quizAll[orderId].id,
            initializedBox: JSON.parse(quizAll[orderId].initializedBox),
            question: quizAll[orderId].question,
            description: JSON.parse(quizAll[orderId].description),
            chartPath: config.staticFileServer + quizAll[orderId].chartPath
          },
          userAnswer: userAnswer,
          itemsCount: itemsCount,
          isExample: quizAll[orderId].isExample
        };
      });
};

logicPuzzleSchema.statics.isDealAgree = function (userId, callback) {
  var isDealAgree;

  this.findOne({userId: userId}, (err, logicPuzzle) => {
    if (err || !logicPuzzle || !logicPuzzle.isAgreed) {
      isDealAgree = false;
    } else {
      isDealAgree = logicPuzzle.isAgreed;
    }
    callback(isDealAgree);
  });
};

module.exports = mongoose.model('LogicPuzzle', logicPuzzleSchema);
