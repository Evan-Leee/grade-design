'use strict';
var Users = require('../models/users');
var constant = require('../mixin/constant');

function ReuseController () {

}

ReuseController.prototype.loadAccount = (req, res, next) => {
  if (req.session.user) {
    var userId = req.session.user.id;

    Users.findOne({id: userId}, (err, data) => {
      if(err){
        return next(err);
      }else if (!data){
        res.send({
          status: constant.httpCode.NOT_FOUND
        });
      }else {
        res.send({
          status: constant.httpCode.OK,
          account: data.email
        });
      }
  });
 }else {
   res.send({status: constant.httpCode.ACCEPTED});
 }
};

module.exports = ReuseController;
