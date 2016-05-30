'use strict';

var validate = require('validate.js');
var passwordRetrieveActions = require('../../actions/password-retrieve/password-retrieve-actions');
var passwordRetrieveStore = require('../../store/password-retrieve/password-retrieve-store');
var Reflux = require('reflux');
var constraint = require('../../../../mixin/password-retrieve-constraint');
var page = require('page');
var constant = require('../../../../mixin/constant');

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return '';
}

var passwordRetrieveForm = React.createClass({
  mixins: [Reflux.connect(passwordRetrieveStore)],

  getInitialState: function () {
    return {
      showMessage: false,
      retrieveFailed: false,
      emailError: '',
      clickable: false,
      email: ''
    };
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value.trim();
    var name = target.name;
    var valObj = {};
    var result;
    var error;
    var stateObj = {};
    valObj[name] = value;
    result = validate(valObj, constraint);
    error = getError(result, name);
    stateObj[name + 'Error'] = error;
    this.setState(stateObj);
  },

  retrieve: function (evt) {
    evt.preventDefault();
    if (!this.refs.email.value || this.state.emailError) {

      var valObj = {};
      var stateObj = {};

      valObj.email = this.refs.email.value;
      stateObj.emailError = getError(validate(valObj, constraint), 'email');

      this.setState(stateObj);
    } else {

      this.setState({
        clickable: true
      });
      var email = this.refs.email.value.trim();
      passwordRetrieveActions.retrieve(email);
    }
  },

  back: function() {
    page('register.html');
  },

  render: function () {

    var retrieveClassName = 'password-retrieve-form-container ' + (this.state.showMessage ? 'hide' : '');
    var messageClassName = 'message-container ' + (this.state.showMessage ? '' : 'hide');

    return (
        <div>
          <div id="retrieve" className={retrieveClassName}>
            <h4 className="welcome">密码找回</h4>
            <div className={'lose' + (this.state.retrieveFailed === false ? ' hide' : '')} name="retrieveFailed">
              邮箱不存在
            </div>
            <form action="" onSubmit={this.retrieve}>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="请输入注册时填写的邮箱" name="email"
                       onBlur={this.validate} onkeypress="if(event.keyCode==13||event.which==13){return false;}"
                       ref="email" autoComplete="off"/>
                <div
                    className={'lose' + (this.state.emailError === '' ? ' hide' : '')}>{this.state.emailError}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <button type="submit" id="retrieve-btn"
                   className="btn btn-block btn-primary col-md-offset-6 col-xs-offset-4"
                   disabled={this.state.clickable}>确认
                    <i className={'fa fa-spinner fa-spin loading' + (this.state.clickable ? '' : ' hide')}/>
                  </button>
                </div>
                <div className="col-md-6 col-sm-6">
                  <button type="button" id="retrieve-btn"
                  className="btn btn-block btn-default col-md-offset-2 col-xs-offset-4"
                  onClick={this.back}>返回登录
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div id="message" className={messageClassName}>
            <p>您的重置密码链接已经发送至邮箱<strong>{this.state.email}</strong>中,请注意查收!</p>
          </div>
        </div>
    );
  }
});

module.exports = passwordRetrieveForm;
