'use strict';

var express = require('express');
var router = express.Router();
var async = require('async');
var _ = require('lodash');
var validate = require('validate.js');
var userConstraint = require('../../mixin/user-detail-constraint');
var passwordConstraint = require('../../mixin/password-constraint');
var newPasswordConstraint = require('../../mixin/confirm-password-constraint');
var md5 = require('js-md5');
var constant = require('../../mixin/constant');
var UserInfo = require('../../models/user-info');
var Users = require('../../models/users');

router.get('/', function (req, res) {
  if (req.session.user) {
    var userId = req.session.user.id;
    UserInfo.findOne({userId: userId}, (err, data)=>{
      if(!err){
        res.send({status: constant.httpCode.OK, data: data})
      }else {
        res.send({status: constant.httpCode.NOT_FOUND, data: null})
      }
    });
  } else {
    res.send({ status: constant.httpCode.ACCEPTED });
  }
});

router.put('/update', function (req, res, next) {
  var userId = req.session.user.id;
  var userInfo = req.body.data;

  var result = _.assign({userId: userId}, userInfo);

  if (validate(result, userConstraint) === undefined && result.gender !== '') {
    async.waterfall([
      (done) => {
        UserInfo.findOne({userId: userId}, (err, data) => {
          data.school = result.school;
          data.name = result.name,
          data.gender = result.gender,
          data.major = result.major,
          data.degree = result.degree,
          data.schoolProvince = result.schoolProvince,
          data.schoolCity = result.schoolCity,
          data.entranceYear = result.entranceYear
          done(err, data);
        });
    },(data, done) => {
      data.save((err,data)=>{done(err,data)});
    }],(err, data) => {
      if(err) next(err);
      res.send({status:constant.httpCode.ACCEPTED})
    })
  } else {
    res.send({status: constant.httpCode.BAD_REQUEST});
  }
});

router.put('/change-password', function (req, res, next) {
  var userId = req.session.user.id;
  var passwordInfo = req.body.data;

  if (validate(passwordInfo, passwordConstraint) === undefined &&
      validate(passwordInfo, newPasswordConstraint) === undefined &&
      passwordInfo.newPassword === passwordInfo.confirmPassword) {
    var partResult = {};

    partResult.oldPassword = md5(passwordInfo.oldPassword);
    partResult.password = md5(passwordInfo.newPassword);

    async.waterfall([
      (done) => {
        Users.findOne({userId: userId}, (err, data) => {
          if(data.password === partResult.oldPassword){
            data.password = partResult.password;
            done(null, data);
          }else {
            done(true,null);
          }
        })
      },(data, done) => {
        data.save((err, data) => {done(err,data)});
      }],(err, data) => {
        if(err) {
          res.send({status: constant.httpCode.BAD_REQUEST});
        } else {
          res.send({
            status: constant.httpCode.OK
          });
        }
    });
  } else {
    res.send({
      status: constant.httpCode.PRECONDITION_FAILED
    });
  }
});

module.exports = router;
