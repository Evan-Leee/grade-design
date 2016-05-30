'use strict';

var lang = require('../mixin/lang-message/chinese');
var constant = require('../mixin/constant').backConstant;
var async = require('async');
var validate = require('validate.js');
var md5 = require('js-md5');
var constraint = require('../mixin/register-constraint');
var httpStatus = require('../mixin/constant').httpCode;
var configuration = require('../models/configuration');
var UserChannel = require('../models/user-channel');
var Users = require('../models/users');
var UserInfo = require('../models/user-info');
var mongoose = require('mongoose');

function checkRegisterInfo (registerInfo) {
  var pass = true;

  var valObj = {};
  valObj.email = registerInfo.email;
  valObj.mobilePhone = registerInfo.mobilePhone;
  valObj.password = registerInfo.password;

  var result = validate(valObj, constraint);

  if (result !== undefined) {
    pass = false;
  }

  if (registerInfo.password.length < constant.PASSWORD_MIN_LENGTH ||
      registerInfo.password.length > constant.PASSWORD_MAX_LENGTH) {
    pass = false;
  }
  return pass;
}

function RegisterController () {

}

RegisterController.prototype.register = (req, res, next) => {
  var registerInfo = req.body;
  var error = {};

  if (checkRegisterInfo(registerInfo)) {
    var isMobilePhoneExist = false;
    var isEmailExist = false;
    var isCaptchaError = false;
    var userId, user, userInfo;

    async.waterfall([
      (done) => {
        if (registerInfo.captcha !== req.session.captcha) {
          error.status = httpStatus.FORBIDDEN;  //  403 验证码错误
          isCaptchaError = true;
          done(error, null);
        } else {
          done(null, null);
        }
      }, (data, done) => {
        Users.findOne({mobilePhone: registerInfo.mobilePhone}, (err, doc) => {
          if(doc){
            isMobilePhoneExist = true;
          }
          done(err, doc);
        })
      }, (data, done) => {
        Users.findOne({email:registerInfo.email}, (err, doc) => {
          if(doc){
            isEmailExist = true;
          }
          if (isMobilePhoneExist || isEmailExist) {
            error.status = httpStatus.FORBIDDEN;
            done(true, doc);
          } else {
            done(err, doc);
          }
        })
      },
      (data, done) => {
        delete registerInfo.captcha;
        registerInfo.password = md5(registerInfo.password);
        Users.find({}, (err, docs) => {
          userId = docs.length + 1;
          done(err, docs);
        });
      },(data,done) => {
        var user = new Users();
        user.id = userId;
        user.role = 0;
        user.mobilePhone = registerInfo.mobilePhone;
        user.email = registerInfo.email;
        user.password = registerInfo.password;
        user.save((err,data) => {
          done(err,data);
        });
      },(data,done) => {
        var userInfo = new UserInfo();
        userInfo.userId = userId;
        userInfo.mobilePhone = registerInfo.mobilePhone;
        userInfo.email = registerInfo.email;
        userInfo.save((err, data) =>{done(err,data)});
      },(data, done) => {
        if (req.cookies.channel !== '') {
          var userChannel = new UserChannel({
            userId: userId,
            channelId: new mongoose.Types.ObjectId(req.cookies.channel)
          });
          userChannel.save((err) => {
            done(err);
          });
        } else {
          done();
        }
      },
      (done) => {
        Users.findOne({email: registerInfo.email, password: registerInfo.password}, (err, doc) => {
          if(doc){user = doc;}
          done(err,doc);
        });
      },(data, done) => {
        Users.findOne({mobilePhone: registerInfo.mobilePhone, password: registerInfo.password}, (err,doc) => {
          if(doc){user = doc;}
          done(err, doc);
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
          error.status = httpStatus.NOT_FOUND;
          done(true, null)
        }
      },
      (data, done) => {
        if (data) req.session.user = data;
        done(null, data);
      }
    ], (err, data) => {
      if (err !== null && error.status === httpStatus.UNAUTHORIZED) {
        res.send({
          status: constant.FORBIDDEN
        });
      } else if (err !== null && error.status === httpStatus.FORBIDDEN) {
        res.send({
          status: constant.FAILING_STATUS,
          message: lang.EXIST,
          data: {
            isEmailExist: isEmailExist,
            isMobilePhoneExist: isMobilePhoneExist,
            isCaptchaError: isCaptchaError
          }
        });
      } else if (err) {
        return next(err);
      } else {
        res.send({
          status: data.status
        });
      }
    });
  }
};

RegisterController.prototype.valdateMobilePhone = (req, res, next) => {
  Users.findOne({mobilePhone: req.query.mobilePhone}, (err, doc) => {
    if(err){
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      res.send();
      return next(err);
    }
    if(doc){
      res.send({
        status: constant.SUCCESSFUL_STATUS
      });
    }else {
      res.send({
        status: constant.FAILING_STATUS
      });
    }
  });
};

RegisterController.prototype.valdateEmail = (req, res, next) => {
  Users.findOne({email: req.query.email}, (err, doc) => {
    if(err){
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      res.send();
      return next(err);
    }
    if(doc){
      res.send({
        status: constant.SUCCESSFUL_STATUS
      });
    }else {
      res.send({
        status: constant.FAILING_STATUS
      });
    }
  });
};


module.exports = RegisterController;
