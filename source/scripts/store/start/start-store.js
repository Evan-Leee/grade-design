'use strict';

var Reflux = require('reflux');
var StartActions = require('../../actions/start/start-actions');
var request = require('superagent');
var errorHandler = require('../../../../tools/error-handler.jsx');
var page = require('page');

var GetAccountStore = Reflux.createStore({
  listenables: [StartActions],

  onInit: function() {
    request.get('/api/test/detail')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, resp) => {
          if(resp.body.data === false) {
            page('user-center.html');
          }
        })
  }
});

module.exports = GetAccountStore;
