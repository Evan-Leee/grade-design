'use strict';

var validate = require('validate.js');
var LoginActions = require('../../actions/register-page/login-actions');
var LoginStore = require('../../store/register-page/login-store');
var RegisterStore = require('../../store/register-page/register-store');

var Reflux = require('reflux');
var constraint = require('../../../../mixin/login-constraint');
var constant = require('../../../../mixin/constant');

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return '';
}

var LoginForm = React.createClass({
  mixins: [Reflux.connect(LoginStore), Reflux.connect(RegisterStore)],

  getInitialState: function () {
    return {
      emailError: '',
      loginPasswordError: '',
      loginFailed: false,
      clickable: false,
      email: '',
      loginPassword: '',
      captcha: '',
      captchaError: ''
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
    if (name === 'email') {
      valObj.email = value;
      valObj.mobilePhone = value;
      result = validate(valObj, constraint);
      error = getError(result, 'email');
      if (error) {
        error = getError(result, 'mobilePhone');
      }
    } else {
      valObj[name] = value;
      result = validate(valObj, constraint);
      error = getError(result, name);
    }
    stateObj[name + 'Error'] = error;
    this.setState(stateObj);
  },

  checkLoginData: function (loginData) {
    var passCheck = true;

    var stateObj = {};
    loginData.forEach((data) => {
      var valObj = {};
      var name = data.name;
      var value = data.value.trim();
      var result;
      var error;

      if (name === 'email') {
        valObj.email = value;
        valObj.mobilePhone = value;
        result = validate(valObj, constraint);
        error = getError(result, 'email');
        if (error) {
          error = getError(result, 'mobilePhone');
        }
      } else {
        valObj[name] = value;
        result = validate(valObj, constraint);
        error = getError(result, name);
      }

      if (name === 'captcha' && value.length === 0) {

        error = '请输入验证码';
        LoginActions.setCaptchaError(error);
        passCheck = false;
      }

      if (error !== '') {
        passCheck = false;
      }


      stateObj[name + 'Error'] = error;

      this.setState(stateObj);
    });

    return passCheck;
  },

  login: function (evt) {
    evt.preventDefault();

    if (this.state.emailError !== '' || this.state.captchaError !== '' || this.state.loginPasswordError !== '') {
      return false;
    }


    var email = ReactDOM.findDOMNode(this.refs.email);
    var loginPassword = ReactDOM.findDOMNode(this.refs.loginPassword);
    var data = [];

    var captcha = {
      name: 'captcha',
      value: this.state.captcha
    };

    data.push(email, loginPassword, captcha);


    if (!this.checkLoginData(data)) {
      return false;
    } else {
      this.setState({
        clickable: true
      });
      LoginActions.login(email.value.trim(), loginPassword.value.trim(), captcha.value.trim());
    }
  },

  render: function () {
    var classString = 'col-md-7 logon-form-container';
    return (
        <div id="logon" className={classString}>
          <h4 className="welcome">欢迎登录思沃学院</h4>
          <div className={'lose' + (this.state.loginFailed === false ? ' hide' : '')} name="loginFailed">用户名或密码错误</div>
          <form action="dashboard.html" onSubmit={this.login}>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="请输入邮箱或手机号" name="email"
                     onBlur={this.validate}
                     ref="email"/>
              <div
                  className={'lose' + (this.state.emailError === '' ? ' hide' : '')}>{this.state.emailError}
              </div>
            </div>
            <div className="form-group">
              <input className="form-control" type="password" placeholder="请输入密码" name="loginPassword"
                     ref="loginPassword" onBlur={this.validate}/>
              <div
                  className={'lose' + (this.state.loginPasswordError === '' ? ' hide' : '')}>{this.state.loginPasswordError}
              </div>
            </div>
            <div className="form-group">
              {this.props.children}
            </div>
            <button type="submit" id="login-btn" disabled={this.state.clickable}
                    className="btn btn-lg btn-block ">登录
              <i className={'fa fa-spinner fa-spin loading' + (this.state.clickable ? '' : ' hide')}/>
            </button>
          </form>
        </div>
    );
  }
});

module.exports = LoginForm;
