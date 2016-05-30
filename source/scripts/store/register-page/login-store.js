'use strict';

var Reflux = require('reflux');
var LoginActions = require('../../actions/register-page/login-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../tools/error-handler.jsx');


var LoginStore = Reflux.createStore({
  listenables: LoginActions,

  onLogin: function (phoneEmail, loginPassword, captcha) {

    request.post('/login')
        .set('Content-Type', 'application/json')
        .send({
          account: phoneEmail,
          password: loginPassword,
          captcha: captcha
        })
        .use(errorHandler)
        .end((err, req) => {
          var data = req.body;
          if (data.status === constant.httpCode.OK) {
            this.trigger({
              loginFailed: false
            });
            if(Object.keys(data.result.userInfo).length === 13){
              page('dashboard.html');
            } else{
              page('user-center.html');
            }
          } else if (data.status === constant.httpCode.FORBIDDEN) {
            this.trigger({
              clickable: false,
              captchaError: '验证码输入错误'
            });
          } else {
            this.trigger({
              clickable: false,
              loginFailed: true
            });
          }
        });
  },

  onSetCaptchaError: function (error) {
    this.trigger({
      captchaError: error
    })
  }

});

module.exports = LoginStore;
