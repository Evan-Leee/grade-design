'use strict';

var Reflux = require('reflux');
var LogicPuzzleActions = require('../../actions/logic-puzzle/logic-puzzle-actions');
var superAgent = require('superagent');
var async = require('async');
var page = require('page');
var _currentIndex = 0;
var _answer;
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../tools/error-handler.jsx');



var LogicPuzzleStore = Reflux.createStore({
  listenables: [LogicPuzzleActions],

  onInit: function() {
    async.waterfall([
      (done) => {
        superAgent.get('/api/test/detail')
            .set('Content-Type', 'application/json')
            .end(function(err, resp) {
              if(resp.body.data === false) {
               done(true, null);
              }else {
                done(null, null);
              }
            });
      },
      (data, done) => {
        superAgent.get('/api/test/isPaperCommitted')
            .set('Content-Type', 'application/json')
            .end(function (err, resp) {
              if(resp.body.isPaperCommitted === true) {
                done('committed', null);
              }else {
                done(null, null);
              }
            });
      }
    ], (err) => {
      if(err === true) {
        page('user-center.html')
      }
      if(err === 'committed') {
        page('dashboard.html')
      }
      if(err) {
        return errorHandler.showError(err)
      }
    })


  },

  onLoadItem: function () {
    async.waterfall([
      (callback) => {
        this.updateItem(callback);
      }, (res, callback) => {
        _answer = res.body.userAnswer;
        this.trigger({
          item: res.body.item,
          userAnswer: res.body.userAnswer,
          itemsCount: res.body.itemsCount,
          orderId: _currentIndex,
          isExample: res.body.isExample
        });
        callback(null, 'done');
      }
    ], function (err, result) {
      if(err){
        console.log(err);
      }
    });
  },

  onSubmitAnswer: function (newOrderId) {
    async.waterfall([
      (callback) => {
        this.onSaveUserAnswer(callback);
      },(res,callback) => {
        _currentIndex = newOrderId;
        this.updateItem(callback);
      },(res,callback) => {
        _answer = res.body.userAnswer;
        this.trigger({
          item: res.body.item,
          userAnswer: res.body.userAnswer,
          itemsCount: res.body.itemsCount,
          orderId: _currentIndex,
          isExample: res.body.isExample,
          lastLoad: false,
          nextLoad: false,
          submitLoad: false
        });
        callback(null,'done');
      }
    ],function(err,result){
      if(err){
        console.log(err);
      }
    });
  },

  onSaveUserAnswer: function (callback) {
    superAgent.post('/api/logic-puzzle/save')
        .set('Content-Type', 'application/json')
        .send({userAnswer: _answer, orderId: _currentIndex})
        .use(errorHandler)
        .end(callback);
  },

  onChangeAnswer: function (val) {
    _answer = val;
    this.trigger({
      userAnswer: _answer
    });
  },

  onSubmitPaper: function (sectionId) {

    async.waterfall([
      (callback) => {
        this.onSaveUserAnswer(callback);
      },(res,callback) =>{
        superAgent.post('/api/logic-puzzle')
            .set('Content_Type', 'application/json')
            .query({sectionId: sectionId})
            .use(errorHandler)
            .end(callback);
      }
    ],function(err,res){
      if (res.statusCode === constant.httpCode.OK) {
        page('dashboard.html');
      }
    });
  },

  updateItem: function (callback) {
    superAgent.get('/api/logic-puzzle')
        .set('Content-Type', 'application/json')
        .query({
          orderId: _currentIndex
        })
        .use(errorHandler)
        .end(callback);
  },

  onTimeOver: function (){
    this.onSubmitPaper();
    this.trigger({
      showModal: true
    });
  }

});


module.exports = LogicPuzzleStore;
