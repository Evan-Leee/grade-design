'use strict';

var Reflux = require('reflux');

var DashboardActions = require('../../actions/dashboard/dashboard-actions');
var DashboardStore = require('../../store/dashboard/dashboard-store');

var Dashboard = React.createClass({
  mixins: [Reflux.connect(DashboardStore)],

  render() {
    return (
      <div>
        <div className="header-bottom-grids text-center">
          <div className="header-bottom-grid1 fadeInUp animated">
            <span className="fa fa-book"></span>
            <h4>真题测验</h4>
          </div>
          <div className="header-bottom-grid2 fadeInUp animated">
            <span className="fa fa-bullseye"></span>
            <h4>专项训练</h4>
          </div>
          <div className="header-bottom-grid3 fadeInUp animated">
            <span className="fa fa-files-o"></span>
            <h4>考试专区</h4>
          </div>
          <div className="header-bottom-grid4 fadeInUp animated">
            <span className="fa fa-pie-chart"></span>
            <h4>个人评估</h4>
          </div>
        </div>
        <div className="services-top-grids text-center">
          <div className="secvice-top-grid-1 fadeInUp animated">
            <p>包含历届真题试题，让你考前心里有数。</p>
            <a href="/contest.html">点击进入</a>
          </div>
          <div className="secvice-top-grid-2 fadeInUp animated">
            <p>定向训练，哪里不行补哪里，考点逐个击破。</p>
            <a href="">点击进入</a>
          </div>
          <div className="secvice-top-grid-3 fadeInUp animated">
            <p>战场入口，平时下的功夫是时候拿出来检验一下了！</p>
            <a href="">点击进入</a>
          </div>
          <div className="secvice-top-grid-4 fadeInUp animated">
            <p>想知道自己战力如何，优劣在哪儿，点这儿！</p>
            <a href="">点击进入</a>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = Dashboard;
