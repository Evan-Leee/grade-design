'use strict';

var Reflux = require('reflux');
var QAPageUpdateAction = require('../../actions/admin/qa-page-update-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../tools/error-handler.jsx');

var QAPageUpdateStore = Reflux.createStore({
  listenables: QAPageUpdateAction,

  onUpdateQAPage: function (url) {
    request.put('/api/qa/update')
        .set('Content-Type', 'application/json')
        .send({qaInfoAddress: url})
        .use(errorHandler)
        .end((err,res) => {
          this.trigger({
            updateStatus: res.body.status === constant.httpCode.OK ? 'success' : 'failed'
          });
        });
  },
  onInit: function() {
    request.get('/api/qa')
    .use(errorHandler)
    .end((err,res) => {
      this.trigger(res.body);
    });
  }
});

module.exports = QAPageUpdateStore;