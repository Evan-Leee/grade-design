'use strict';

require('../less/contest.less');

var Navigation = require('./component/navigation/navigation.component.jsx');
var Account = require('./component/reuse/get-account.component.jsx');
var ContestContent = require('./component/contest/contest-content.component.jsx');

var ContestApp = React.createClass({

  render: function() {
    return (
      <div>
        <header>
          <Navigation>
            <Account />
          </Navigation>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 fadeInDown animated">
              <h1 className="page-header">真题训练
                <small> Contest Room</small>
              </h1>
            </div>
          </div>
          <ContestContent perPage={5}/>
        </div>

      </div>
    )
  }
});

ReactDom.render(<ContestApp />,document.getElementById('contest'));
