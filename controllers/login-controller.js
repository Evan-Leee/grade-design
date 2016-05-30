'use strict';

var constant = require('../mixin/constant');
var md5 = require('js-md5');
var validate = require('validate.js');
var constraint = require('../mixin/login-constraint');
var apiRequest = require('../services/api-request');
var Users = require('../models/users');
var UserInfo = require('../models/user-info');
var async = require('async');

function checkLoginInfo (account, password) {
  var pass = true;
  var valObj = {};

  valObj.email = account;
  valObj.mobilePhone = account;
  valObj.loginPassword = password;
  var result = validate(valObj, constraint);

  if (!(result.email || result.mobilePhone)) {
    pass = false;
  }

  if (password.length < constant.PASSWORD_MIN_LENGTH ||
      password.length > constant.PASSWORD_MAX_LENGTH) {
    pass = false;
  }
  return pass;
}

function LoginController () {

}

LoginController.prototype.login = (req, res, next) => {
  var account = req.body.account;
  var password = req.body.password;
  var captcha = req.body.captcha;
  var error = {};
  var user, userInfo;

  async.waterfall([
    (done) => {
      if (captcha !== req.session.captcha) {
        error.status = constant.httpCode.FORBIDDEN;
        done(error, null);
      } else {
        done(null, null);
      }
    }, (data, done) => {
      if (checkLoginInfo(account, password)) {
        password = md5(password);
        Users.findOne({email: account, password: password}, (err, doc) => {
          if(doc){user = doc;}
          done(err, doc);
        });
      } else {
        error.status = constant.httpCode.UNAUTHORIZED;
        done(error, null);
      }
    }, (data, done) => {
        Users.findOne({mobilePhone: account, password: password}, (err,doc) => {
          if(doc){user = doc;}
          done(err, doc)
        });
    },(data, done) => {
      if(user){
        UserInfo.findOne({userId: user.id}, (err, doc) => {
          userInfo = doc;
          var result = {
            id: user.id,
            role: user.role,
            userInfo: userInfo,
            status: 200
          };
          done(null, result);
        });
      }else {
        error.status = constant.httpCode.NOT_FOUND;
        done(true, null);
      }
    }, (result, done) => {
        if (result) {
        req.session.user = result;
        done(null, result);
      } else {
        error.status = constant.httpCode.UNAUTHORIZED;
        done(error, null);
      }
    }], (err, result) => {
    if (err !== null && error.status === constant.httpCode.FORBIDDEN) {
      res.send({status: constant.httpCode.FORBIDDEN});
      return;
    } else if (err !== null && error.status === constant.httpCode.UNAUTHORIZED) {
      res.send({status: constant.httpCode.UNAUTHORIZED});
      return;
    }else if(err !== null && error.status === constant.httpCode.NOT_FOUND){
      res.send({status: constant.httpCode.NOT_FOUND});
      return;
    } else if (result.status === constant.httpCode.OK) {
      res.send({status: constant.httpCode.OK, result: result});
      return;
    }
    return next(error);
  });
};

module.exports = LoginController;
