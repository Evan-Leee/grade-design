'use strict';

var Reflux = require('reflux');
var RegisterAction = require('../../actions/register-page/register-actions.js');
var RegisterStore = require('../../store/register-page/register-store.js');
var RegisterForm = require('./register-form.component.jsx');
var LoginForm = require('./login-form.component.jsx');
var LoginInfo = require('./login-info.component.jsx');
var RegisterAgreement = require('./register-agreement.component.jsx');
var RegisterPassword = require('./register-password.component.jsx');
var Captcha = require('./captcha.component.jsx');

var RegisterApp = React.createClass({
  mixins: [Reflux.connect(RegisterStore)],

  getCurrentState: function() {
    var state = window.location.href.split("#");
    return "login" === state[1];
  },

  getInitialState: function () {
    return {
      isDisabled: false,
      loginState: this.getCurrentState()
    }
  },

  componentDidMount: function () {
    var _this = this;

    window.onpopstate = function() {
      console.log(_this.getCurrentState());
      _this.setState({
        loginState: _this.getCurrentState()
      });
    }

  },

  render() {
    var formHtml = this.state.loginState ?
        (<LoginForm><Captcha/></LoginForm>) :
        (<RegisterForm isDisabled={this.state.isDisabled}>
          <RegisterPassword isDisabled={this.state.isDisabled}/>
          <Captcha isDisabled={this.state.isDisabled}/>
        </RegisterForm>);
    return (
        <div className="row">
          {formHtml}
          <LoginInfo isLoginState={this.state.loginState}/>
          <RegisterAgreement/>
        </div>
    );
  }
});

module.exports = RegisterApp;
