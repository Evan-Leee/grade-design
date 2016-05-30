'use strict';

var LoginInfo = React.createClass({

  render: function () {

    var passwordRetrieve = 'password-retrieve ' + (this.props.isLoginState ? '' : 'hide');

    return (
        <div id="login-info" className="col-md-5 register-form-right">
          <div id="register-right" className="link">
            {this.props.isLoginState ? '还没账号?' : '已有账号?'}
            <a id="change-to-logon" href={this.props.isLoginState ? 'register.html#register' : 'register.html#login'}
               onClick={this.toggleState}>
              {this.props.isLoginState ? '立即注册' : '立即登录'}
            </a>
          </div>
          <div className={passwordRetrieve}>
            忘记密码?<a href="password-retrieve.html">立即找回</a>
          </div>
        </div>
    );
  }
});

module.exports = LoginInfo;
