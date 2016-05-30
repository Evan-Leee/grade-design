/*eslint no-magic-numbers: 0*/

'use strict';

var homeworkQuizzesStatus = require('../../../../mixin/constant').homeworkQuizzesStatus;

var HomeworkSidebar = React.createClass({
  getIconCss: function (state) {
    var icon = 'home-icon h4 fa fa-lg fa-';
    var iconList = ['lock', '', 'clock-o flashing', 'check-circle', 'times-circle'];
    var statusCode = [
      homeworkQuizzesStatus.LOCKED,
      homeworkQuizzesStatus.ACTIVE,
      homeworkQuizzesStatus.PROGRESS,
      homeworkQuizzesStatus.SUCCESS,
      homeworkQuizzesStatus.ERROR
    ];

    statusCode.forEach((item, index) => {
      if (state === item) {
        icon = icon + iconList[index];
      }
    });
    return icon;
  },

  handleClick: function (orderId) {
    if(orderId !== this.props.orderId) {
      this.props.onOrderIdChange(orderId);
    }
  },

  render() {
    var itemHtml = this.props.homeworkQuizzes.map((item, index) => {
      var orderId = index + 1;
      var classStr = 'list-group-item ' +(this.props.orderId === orderId ? ' selected' : '');
      var iconCss = this.getIconCss(item.status);
      var quizName = '第' + (orderId) + '题';

      return (
          <button className={classStr}
                  key={index}
                  onClick={this.handleClick.bind(null, orderId)}>
            <div className="row">
              <div className="col-xs-9 h4 text-center ">{quizName}</div>
              <div className='col-xs-3'>
                <i className={iconCss}/></div>
            </div>
          </button>
      );
    });

    return (
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="list-group">
            <div className="list-group-item active">
              <div className="row">
                <div className="col-xs-9 h3 text-center">编程题</div>
                <div className="col-xs-3"><i className='homework-nav-icon h3 fa fa-pencil-square-o'/></div>
              </div>
            </div>
            {itemHtml}
          </div>
        </div>
    );
  }
});

module.exports = HomeworkSidebar;
