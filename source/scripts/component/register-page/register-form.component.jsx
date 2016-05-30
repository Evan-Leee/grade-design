'use strict';

var Reflux = require('reflux');
var validate = require('validate.js');
var constraint = require('../../../../mixin/register-constraint');
var constant = require('../../../../mixin/constant');
var async = require('async');
var RegisterActions = require('../../actions/register-page/register-actions');
var RegisterStore = require('../../store/register-page/register-store');
var LoginStore = require('../../store/register-page/login-store');

var asyncContainersFunc = {
  email: function (value, done) {
    RegisterActions.checkEmail(value, done);
  },
  mobilePhone: function (value, done) {
    RegisterActions.checkMobilePhone(value, done);
  },
  captcha: function (value, done) {
    if (value.length !== 4) {
      done({captchaError: '验证码位数错误'})
    }
    if (value.length === 0) {
      done({captchaError: '请输入验证码'})
    }
    done({captchaError: ''})
  }
};

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return '';
}


var RegisterForm = React.createClass({
  mixins: [Reflux.connect(RegisterStore), Reflux.connect(LoginStore)],

  getInitialState: function () {
    return {
      mobilePhoneError: '',
      emailError: '',
      captchaError: '',
      agree: false,
      clickable: false,
      password: '',
      captcha: ''
    };
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value.trim();
    var name = target.name;
    var valObj = {};
    valObj[name] = value;

    var result = validate(valObj, constraint);
    var error = getError(result, name);
    var stateObj = {};
    stateObj[name + 'Error'] = error;

    this.setState(stateObj);

    if ('' === error && name !== 'password') {
      asyncContainersFunc[name](value, (stateObj) => {
        this.setState(stateObj);
      });
    }
  },

  changeAgreeState: function () {
    var newState = !this.state.agree;
    this.setState({agree: newState});
  },

  checkRegisterData: function (registerInfo) {
    var passCheck = true;

    if (this.state.agree === false) {
      $('#agree-check').modal('show');
      passCheck = false;
    }

    var stateObj = {};
    registerInfo.forEach((item, i) => {
      var valObj = {};

      var value = item.value.trim();
      var name = item.name;

      valObj[name] = value;
      var result = validate(valObj, constraint);

      var error = getError(result, name);

      if (name === 'captcha' && value.length === 0) {
        error = '请输入验证码';
        passCheck = false;
      }

      if (error !== '') {
        passCheck = false;
      }

      stateObj[name + 'Error'] = error;
    });

    RegisterActions.checkData(stateObj);
    return passCheck;
  },

  register: function (evt) {
    evt.preventDefault();


    if (this.state.mobilePhoneError !== '' || this.state.emailError !== '' || this.state.captchaError !== '') {
      return false;
    }

    var registerData = [];
    var mobilePhone = ReactDOM.findDOMNode(this.refs.mobilePhone);
    var email = ReactDOM.findDOMNode(this.refs.email);

    var password = {
      name: 'password',
      value: this.state.password
    };

    var captcha = {
      name: 'captcha',
      value: this.state.captcha
    };

    registerData.push(mobilePhone, email, password, captcha);

    if (!this.checkRegisterData(registerData)) {
      return false;
    } else {
      this.setState({
        clickable: true
      });

      RegisterActions.register(mobilePhone.value.trim(), email.value.trim(), password.value.trim(), captcha.value.trim());
    }
  },

  render: function () {
    var classString = 'col-md-7 logon-form-container';

    return (
        <div id="register" className={classString}>
          <label className={'registerable' + (this.props.isDisabled ? '' : ' hide')}>注册已关闭</label>
          <h4 className="welcome">欢迎注册在线答题考试系统</h4>

          <form action='user-center.html' onSubmit={this.register}>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="请输入手机号" name="mobilePhone" ref="mobilePhone"
                     onBlur={this.validate} disabled={this.props.isDisabled}/>


              <div
                  className={'lose' + (this.state.mobilePhoneError === '' ? ' hide' : '')}>{this.state.mobilePhoneError}</div>
            </div>

            <div className="form-group">
              <input className="form-control" type="text" placeholder="请输入邮箱" name="email" ref="email"
                     onBlur={this.validate} disabled={this.props.isDisabled}/>

              <div className={'lose' + (this.state.emailError === '' ? ' hide' : '')}>{this.state.emailError}</div>
            </div>

            <div className="form-group">
              {this.props.children[0]}
            </div>

            <div className="form-group">
              {this.props.children[1]}
            </div>


            <div className="checkbox">
              <label>
                <input type="checkbox" className="agree-check" onClick={this.changeAgreeState}
                       disabled={this.props.isDisabled}/> 同意
              </label>
              <a id="agreement" data-toggle="modal" data-target="#registerAgreement">注册协议</a>
              <span>和</span>
              <a id="agreement" data-toggle="modal" data-target="#securityAgreement">保密协议</a>
            </div>


            <button type="submit" id="register-btn" ref="register"
                    className="btn btn-lg btn-block " disabled={this.state.clickable}
                    disabled={this.props.isDisabled}>注册

              <i className={'fa fa-spinner fa-spin' + (this.state.clickable ? '' : ' hide')}/>
            </button>
          </form>
        </div>
    );
  }
});

module.exports = RegisterForm;
