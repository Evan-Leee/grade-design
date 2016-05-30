'use strict';


var LoginStore = require('../../store/register-page/login-store');
var RegisterStore = require('../../store/register-page/register-store');
var RegisterActions = require('../../actions/register-page/register-actions');
var Reflux = require('reflux');
var constraint = require('../../../../mixin/register-constraint');
var validate = require('validate.js');


var Captcha = React.createClass({
  mixins: [Reflux.connect(RegisterStore), Reflux.connect(LoginStore)],

  captchaLoaded: false,

  getInitialState: function () {
    return {
      captchaError: '',
      isLoding: true
    };
  },

  checkInfo: function (value) {
    if (value.length === 0) {
      return '请输入验证码';
    } else if (value.length !== 4) {
      return '验证码位数错误';
    }
    return '';
  },

  loadCaptcha: function () {

    if (this.state.captchaLoaded) {
      return;
    }
    this.captchaLoaded = true;

    var img = this.refs.img;
    img.onload = () => {
      this.setState({
        isLoding: false
      });
    };

    var hash = ('' + Math.random()).substr(3, 8);
    img.src = "/captcha.jpg?_" + hash;
  },

  componentDidMount: function () {
    this.loadCaptcha();
  },

  reloadCaptcha: function () {

    this.captchaLoaded = false;
    this.setState({
      isLoding: false
    });

    this.loadCaptcha();
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    var valObj = {};
    valObj[name] = value;
    var error = this.checkInfo(value);

    var stateObj = {};

    stateObj[name + 'Error'] = error;
    this.setState(stateObj);

    stateObj.captcha = value;

    RegisterActions.inputCaptcha(stateObj);
  },

  render: function () {
    return (
        <div>
          <div className="captcha-input">
            <input className="form-control" type="text" placeholder="请输入验证码" name="captcha"
                   ref="captcha" disabled={this.props.isDisabled}
                   onBlur={this.validate}/>
            <div className={'lose' + (this.state.captchaError === '' ? ' hide' : '')}>{this.state.captchaError}
            </div>
          </div>
          <div className="pull-right captcha-img">

            <img ref="img" title="点击刷新验证码"
                 className={(this.state.isLoding ? ' hide' : '')}
                 onClick={this.reloadCaptcha}
            />
            <i className={'fa fa-spinner fa-spin loading captcha-loading' + (this.state.isLoding ? '' : ' hide')}/>
          </div>

        </div>
    );
  }
});

module.exports = Captcha;
