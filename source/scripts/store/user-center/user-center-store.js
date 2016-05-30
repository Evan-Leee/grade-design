'use strict';

var Reflux = require('reflux');
var UserCenterActions = require('../../actions/user-center/user-center-actions');
var request = require('superagent');
var page = require('page');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../tools/error-handler.jsx');


var UserDetailStore = Reflux.createStore({
  listenables: [UserCenterActions],

  onLoadUserDetail: function () {
    request.get('/user-detail')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, res) => {
          if (err) {
            return;
          } else if (res.body.status === constant.httpCode.ACCEPTED) {
            this.trigger({isThirdParty: true});
          } else if (res.body.status === constant.httpCode.OK) {
            this.trigger({
              school: res.body.data.school,
              schoolProvince: res.body.data.schoolProvince,
              schoolCity: res.body.data.schoolCity,
              name: res.body.data.name,
              mobilePhone: res.body.data.mobilePhone,
              email: res.body.data.email,
              gender: res.body.data.gender,
              major: res.body.data.major,
              degree: res.body.data.degree,
              entranceYear: res.body.data.entranceYear,
            });
          } else {
            return;
          }
        });
  },

  onUpdateUserDetail: function (userData) {
    request.put('/user-detail/update')
        .set('Content-Type', 'application/json')
        .send({
          data: userData
        })
        .use(errorHandler)
        .end((err, res) => {
          if (res.body.status === constant.httpCode.ACCEPTED) {
            page('dashboard.html');
          } else {
            console.log('update error');
          }
        });
  },

  onChangeState: function (state, currentState) {
    if (state !== currentState) {
      this.trigger({
        currentState: state

      });
    }
  },

  onChangeGender: function (name) {
    this.trigger({gender: name});
  },

  onValidateGender: function (genderError) {
    if (genderError === true) {
      this.trigger({genderError: false});
    }
  },

  onCheckGender: function (gender) {
    if (gender === '') {
      this.trigger({genderError: true});
    } else {
      this.trigger({genderError: false});
    }
  }
});
module.exports = UserDetailStore;
