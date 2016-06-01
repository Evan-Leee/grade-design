'use strict';

var Navigation = React.createClass({
  render: function () {
    return (
        <nav>
          <div className="brand">
            <a href="/">
              <img src="build/intern.png"/>
            </a>
          </div>
          {this.props.children}
        </nav>
    );
  }
});

module.exports = Navigation;
