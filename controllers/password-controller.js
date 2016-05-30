'use strict';

var async = require('async');
var apiRequest = require('../services/api-request');
var emailServer = require('../services/email');
var constant = require('../mixin/constant');
var yamlConfig = require('node-yaml-config');
var emailDomain = yamlConfig.load('./config/config.yml').emailServer;
var md5 = require('js-md5');

function PasswordController () {

}

PasswordController.prototype.retrieve = (req, res) => {
  var retrieveUrl = 'users/password/retrieve';
  var email = req.query.email;
  var query = {
    field: 'email',
    value: email
  };

  async.waterfall([
    (done) => {
      apiRequest.get(retrieveUrl, query, done);
    },
    (result, done) => {
      var status = parseInt(result.body.status);

      if (status === constant.httpCode.OK) {
        var token = result.body.token;
        var linkAddress = 'http://' + emailDomain + '/password-reset.html?token=' + token;

        emailServer.sendEmail(email, linkAddress, (err, status) => {
          if (err) {
            done(true, null);
          } else {
            done(null, null);
          }
        });
      } else {
        done(true, null);
      }
    }
  ], (err, data) => {
    if (err) {
      res.send({status: constant.httpCode.NOT_FOUND});
    } else {
      res.send({status: constant.httpCode.OK});
    }
  });

};

PasswordController.prototype.reset = (req, res) => {
  var retrieveUrl = 'users/password/reset';
  var newPassword = md5(req.body.newPassword);

  var token = req.body.token;
  var query = {
    newPassword: newPassword,
    token: token
  };

  apiRequest.post(retrieveUrl, query, function (err, result) {
    if (err) {
      res.sendStatus(constant.httpCode.INTERNAL_SERVER_ERROR);
    } else {
      res.send({status: parseInt(result.body.status)});
    }
  });
};

module.exports = PasswordController;
