'use strict';

require('../less/contest-paper.less');

var Navigation = require('./component/navigation/navigation.component.jsx');
var Account = require('./component/reuse/get-account.component.jsx');
var ContestPaperDetail = require('./component/contest/contest-paper-detail.component.jsx');

function getId() {
  var url = location.search;
  if (url.indexOf("?") != -1)var id = url.substr(1).split("=")[1];
  return id;
}

var ContestPaperApp = React.createClass({

  render: function () {
    return (
      <div>
        <header>
          <Navigation>
            <Account />
          </Navigation>
        </header>
        <ContestPaperDetail id={getId()}/>
      </div>
    )
  }
});

ReactDom.render(<ContestPaperApp />, document.getElementById('contest-paper'));
