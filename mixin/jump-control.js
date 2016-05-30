'use strict';

function jumpControl (session) {
  var isLogined = Boolean(session.user);
  var isAdmin = isLogined ? (Number(session.user.role) === 9) : false;

  return [{
    originPath: [
      '/reuse/account',
      /homework\/scoring$/
    ],
    condition: !isLogined,
    status: 401
  }, {
    originPath: [
      '/admin/registerable',
      '/admin/channel',
      '/report/paper/1/scoresheet'
    ],
    condition: !isLogined || !isAdmin,
    status: 403
  }];
}
module.exports = jumpControl;
