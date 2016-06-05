'use strict';

var Reflux = require('reflux');

var ContestActions = require('../../actions/contest/contest-actions');
var ContestStore = require('../../store/contest/contest-store');
var page = require('page');

var ContestPaper = React.createClass({
  mixins: [Reflux.connect(ContestStore)],

  handleClick: function (){
    page('contest-paper.html?id='+this.props.paper.id);
  },

  render() {
    return (
      <div className="row contest-paper fadeInUp animated" key={this.props.key}>
        <div className="col-md-7">
          <a href="javascript:void(0)" onClick={this.handleClick} >
            <img className="img-responsive" src={this.props.paper.img} />
          </a>
        </div>
        <div className="col-md-5">
          <h1>#{this.props.paper.id}</h1>
          <h3>{this.props.paper.name}</h3>
          <h4>{this.props.paper.desc.heading}</h4>
          <p>{this.props.paper.desc.content}</p>
          <button className="btn start"  onClick={this.handleClick}>
            开始答题
            <span className="glyphicon glyphicon-chevron-right"></span>
          </button>
        </div>
      </div>
    );
  }
});

module.exports = ContestPaper;