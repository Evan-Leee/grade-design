'use strict';

require('./libs/outdatedBrowserCheck');
require('../less/dashboard.less');

var Dashboard = require('./component/dashboard/dashboard.component.jsx');
var Navigation = require('./component/navigation/navigation.component.jsx');
var Account = require('./component/reuse/get-account.component.jsx');
var Row = require('react-bootstrap/lib/Row');
var DashboardActions = require('./actions/dashboard/dashboard-actions');
var DashboardStore = require('./store/dashboard/dashboard-store');
var Reflux = require('reflux');

var DashboardApp = React.createClass({
  mixins: [Reflux.connect(DashboardStore)],

  getInitialState: function() {
    return {

    }
  },

  componentDidMount: function() {


  },

  render: function() {
    return (
        <div>
          <header>
            <Navigation>
              <Account />
            </Navigation>
          </header>
          <Dashboard />
        </div>
    )
  }
});

ReactDom.render(<DashboardApp />,document.getElementById('dashboard-container'));
