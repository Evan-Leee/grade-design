'use strict';

var async = require('async');


function LogoutController () {

}

LogoutController.prototype.logout = (req, res, next) => {
  var logoutUri = 'logout';

  if (!req.session.user) {
    res.end();
    return;
  }

  req.session.destroy(function (err) {
    if (!err) res.end();
  });
};


module.exports = LogoutController;
