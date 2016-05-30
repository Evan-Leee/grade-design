'use strict';

var Reflux = require('reflux');
var DashboardActions = require('../../actions/dashboard/dashboard-actions');
var request = require('superagent');
var nocache = require('superagent-no-cache');
var errorHandler = require('../../../../tools/error-handler.jsx');
var page = require('page');

var DashboardStore = Reflux.createStore({
  listenables: DashboardActions,

  onInit: function() {
    request.get('/api/test/detail')
        .set('Content-Type', 'application/json')
        .use(nocache)
        .end((err, resp) => {
          if(resp.body.data === false) {
            page('user-center.html');
            this.trigger({
              isGetStatus: false
            })
          }else {
            this.trigger({
              isGetStatus: true
            });
          }
        })
  },
  onGetStatus: function () {
    request.get('/api/dashboard')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, res) => {
          var puzzleUnable = res.body.isPaperCommited;
          this.trigger({
            puzzleEnabled: !puzzleUnable,
            homeworkEnabled: res.body.isPaperCommited,
            isOverTime: res.body.isOverTime,
            isFinished: res.body.isFinished
          });
        });
  },

  submitPaper: function () {
    request.post('/api/logic-puzzle')
        .set('Content_Type', 'application/json')
        .use(errorHandler)
        .end();
  }

});

module.exports = DashboardStore;
