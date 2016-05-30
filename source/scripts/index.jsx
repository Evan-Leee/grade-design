'use strict';
require('../less/index.less');
require('../images/blackboard.jpg');

var Account = require('./component/reuse/get-account.component.jsx');
var IndexMenu = require('./component/index/index-menu.component.jsx');

var Index = React.createClass({
  componentWillMount:function() {
    var channel;
    var url = location.search;
    var index = 9;

    if(url.indexOf('channel') > 0) {
      channel = url.substr(index);
    }else {
      channel = '';
    }
    document.cookie = 'channel=' + channel;
  },
  render: function() {
    return (
        <div>
          <div id="head-right" className="fadeIn animated">
            <Account state="index" />
          </div>
          <IndexMenu />
        </div>
    )
  }
});

ReactDom.render(<Index />, document.getElementById('index-content'));
