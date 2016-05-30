/*eslint no-magic-numbers: 0*/

'use strict';

var Col = require('react-bootstrap/lib/Col');
var Reflux = require('reflux');
var DashboardStore = require('../../store/dashboard/dashboard-store');
var DashboardIcon = React.createClass({
  mixins: [Reflux.connect(DashboardStore)],

  getInitialState: function () {
    return {
      puzzleEnabled: true,
      homeworkEnabled:false,
      isOverTime: false,
      isFinished: ''
    };
  },

  render() {
    var PuzzleHref = (this.state.puzzleEnabled === true ? 'start.html?sectionId=1' : '#');
    var homeworkHref = (this.state.homeworkEnabled === true ? 'homework.html' : '#');
    homeworkHref = this.state.isOverTime || this.state.isFinished ? 'deadline.html': homeworkHref;
    var puzzleDisable = (this.state.puzzleEnabled === true ? 'enable' : 'disable');
    var homeworkDisable = (this.state.homeworkEnabled === true ? 'enable' : 'disable');

    var iconInfos = {
      logic: {
        title: '逻辑题',
        href: PuzzleHref,
        isEnabled: puzzleDisable,
        name: 'logic',
        glyphicon: 'glyphicon-education'
      },
      homework: {
        title: '编程题',
        href: homeworkHref,
        isEnabled: homeworkDisable,
        name: 'homework',
        glyphicon: 'glyphicon-road'
      }
    };
    return (
        <div className="dashboard-icon">
          <a href={iconInfos[this.props.name].href} className="icon-view">
            <div className={'icon-wrapper-'+iconInfos[this.props.name].isEnabled}
                 name={iconInfos[this.props.name].name}>
              <div className="icon-img" name={iconInfos[this.props.name].name}>
                <span className={'glyphicon '+iconInfos[this.props.name].glyphicon} aria-hidden="true"/>
              </div>
              <div className="icon-name">
                {iconInfos[this.props.name].title}
              </div>
            </div>
          </a>
        </div>
    );
  }
});

module.exports = DashboardIcon;