'use strict';

var Reflux = require('reflux');
var ContestActions = require('../../actions/contest/contest-actions');
var superagent = require('superagent');
var errorHandler = require('../../../../tools/error-handler.jsx');
var page = require('page');

var ContestStore = Reflux.createStore ({
  listenables: ContestActions,

  onInitPaper: function (id){
    superagent.get('/contest-paper/detail')
      .set('Content-Type', 'application/json')
      .query({paperId: id})
      .use(errorHandler)
      .end((err, res) => {
        if(err){
          console.log(err);
        }else {
          console.log(res.body);
          this.trigger({
            questions: res.body.questions,
            paperName: res.body.paperName
          })
        }
      });

  },

  onInitPaperList: function (perPage, offset){
    superagent.get('/contest-paper')
      .set('Content-Type', 'application/json')
      .query({perPage: perPage, offset: offset})
      .use(errorHandler)
      .end((err, res) => {
        if(err){
          console.log(err);
        }else {
          this.trigger({
          papers: res.body.papers,
          pageNum: Math.ceil(res.body.pageInfo.total / perPage)
          })
        }
      })
  }

});

module.exports = ContestStore;