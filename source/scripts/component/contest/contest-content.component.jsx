'use strict';

var ContestPaper = require('./contest-paper.component.jsx');
var ContestActions = require('../../actions/contest/contest-actions');
var ContestStore = require('../../store/contest/contest-store');
var Reflux = require('reflux');
var ReactPaginate = require('react-paginate');

var ContestContent = React.createClass({
  mixins: [Reflux.connect(ContestStore)],

  getInitialState: function () {
    return ({
      papers: [],
      offset: 0,
      pageNum: 0,
      perPage: this.props.perPage
    });
  },

  componentDidMount: function () {
    ContestActions.initPaperList(this.state.perPage, this.state.offset);
  },

  handleClick: function (elem) {
    var selected = elem.selected;
    var offset = Math.ceil(selected * this.state.perPage);
    $('body,html').animate({scrollTop: 0}, 800);
    this.setState({offset: offset}, () => {
      ContestActions.initPaperList(this.state.perPage, this.state.offset)
    })
  },


  render() {
    var content = this.state.papers.map((paper, index)=> {
      return (
        <ContestPaper paper={paper} key={index}/>
      )
    });
    return (
      <div>
        {content}
        <div className="paginate-container">
          <ReactPaginate previousLabel={<span className="glyphicon glyphicon-chevron-left"></span>}
                         nextLabel={<span className="glyphicon glyphicon-chevron-right"></span>}
                         breakLabel={<a href="">...</a>}
                         pageNum={this.state.pageNum}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         clickCallback={this.handleClick}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"}/>
        </div>

      </div>
    );
  }
});

module.exports = ContestContent;