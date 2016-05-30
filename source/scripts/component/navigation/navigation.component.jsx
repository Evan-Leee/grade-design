'use strict';

var Navigation = React.createClass({
  render: function () {
    return (
        <nav>
          <div className="brand">
            <a href="/">
              <img src="build/2016-summer-logo-white.png"/>
            </a>
          </div>
          {this.props.children}
        </nav>
    );
  }
});

module.exports = Navigation;
