'use strict';

require('es6-shim');
var nocache = require('superagent-no-cache');
var Reflux = require('reflux');
var HomeworkActions = require('../../actions/homework/homework-actions');
var superAgent = require('superagent');
var homeworkQuizzesStatus = require('../../../../mixin/constant').homeworkQuizzesStatus;
var errorHandler = require('../../../../tools/error-handler.jsx');
var async = require('async');
var page = require('page');

var pollTimeout;
var TIMEOUT = 5000;

var HomeworkSidebarStore = Reflux.createStore({
  listenables: [HomeworkActions],

  init: function () {
    this.data = {};
  },

  hasTaskProcess() {
    return this.data.homeworkQuizzes.some((item) => {
      return item.status === homeworkQuizzesStatus.PROGRESS;
    });
  },

  pollData: function () {
    if (this.hasTaskProcess()) {
      pollTimeout = setTimeout(this.onInit, TIMEOUT);
    } else {
      pollTimeout && clearTimeout(pollTimeout);
    }
  },

  onInit: function () {
    async.waterfall([
      (done) => {
        superAgent.get('/api/test/detail')
            .set('Content-Type', 'application/json')
            .use(nocache)
            .use(errorHandler)
            .end(function(err,resp) {
              if(resp.body.data === false) {
              done(true,null);
              }else {
                done(null,null);
              }
            });
      },
      (data,done) => {
        superAgent.get('/api/test/isPaperCommitted')
            .set('Content-Type', 'application/json')
            .use(nocache)
            .use(errorHandler)
            .end(function (err, resp) {
              if(resp.body.isPaperCommitted === false) {
                done('notCommitted', null);
              }else {
                done(null, null);
              }
            })
      },
      (data, done) => {
        superAgent.get('/api/homework/get-list')
            .set('Content-Type', 'application/json')
            .use(nocache)
            .use(errorHandler)
            .end(done);
      },

      (data, done) => {
        this.data.homeworkQuizzes = data.body.homeworkQuizzes;

        var orderId = location.hash.substr(1);
        orderId = parseInt(orderId) || 1;
        orderId = Math.max(orderId, 1);
        orderId = Math.min(orderId, this.data.homeworkQuizzes.length);
        this.data.orderId = orderId;

        done(null, {
          orderId: orderId
        });
      },

      (query, done) => {
        superAgent.get('/api/homework/quiz')
            .set('Content-Type', 'application/json')
            .use(nocache)
            .use(errorHandler)
            .query(query)
            .end(done);
      }
    ], (err, data) => {
      if(err === true) {
        page('user-center.html');
      }
      if(err === 'notCommitted') {
        page('dashboard.html');
      }
      this.data.currentQuiz = data.body.quiz;
      this.trigger(this.data);
      this.pollData();
    });
  },

  onCreateTask: function (data) {

    var jsonData = Object.assign({
      paperId: 1,
      quizId: this.data.currentQuiz.id,
      homeworkQuizUri: this.data.currentQuiz.uri
    }, data);

    async.waterfall([
      (done) => {
        superAgent.post('/api/homework/scoring')
            .set('Content-Type', 'application/json')
            .use(nocache)
            .use(errorHandler)
            .send(jsonData)
            .end(done);
      },

      (data, done) => {
        this.data.currentQuiz.status = data.body.status;
        this.data.currentQuiz.result = data.body.result;
        this.data.homeworkQuizzes[this.data.orderId - 1].status = data.body.status;
        done(null, null);
      }
    ], (err, data) => {
      this.trigger(this.data);
      this.pollData();
    });
  },

  onChangeOrderId: function (orderId) {
    async.waterfall([
      (done) => {
        var orderId = location.hash.substr(1);
        orderId = parseInt(orderId) || 1;
        orderId = Math.max(orderId, 1);
        orderId = Math.min(orderId, this.data.homeworkQuizzes.length);
        this.data.orderId = orderId;

        done(null, {
          orderId: orderId
        });
      },

      (query, done) => {
        superAgent.get('/api/homework/quiz')
            .set('Content-Type', 'application/json')
            .use(nocache)
            .use(errorHandler)
            .query(query)
            .end(done);
      }
    ], (err, data) => {

      this.data.currentQuiz = data.body.quiz;
      this.trigger(this.data);
      this.pollData();
    });
  }
});

module.exports = HomeworkSidebarStore;
