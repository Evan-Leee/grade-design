'use strict';

var Checking = require('../paper/checking.component.jsx');
var Choice = require('../paper/choice.component.jsx');
var FillIn = require('../paper/fill-in.component.jsx');
var Multi = require('../paper/multi.component.jsx');
var ContestActions = require('../../actions/contest/contest-actions');
var ContestStore = require('../../store/contest/contest-store');
var Reflux = require('reflux');

var ContestPaperDetail = React.createClass({
  mixins: [Reflux.connect(ContestStore)],

  getInitialState: function () {
    return ({
      questions: [],
      paperName: '',
      answers: {}
    });
  },

  componentWillMount: function () {
    ContestActions.initPaper(this.props.id)
  },

  submitAnswer: function (){
    console.log(this.state.answers);
  },

  setAnswer: function (name,answer){
    this.state.answers[name] = answer;
  },

  render(){
    var content = [];
    var completions = this.state.questions.filter((question)=>{
      return question.type === 'fill-in';

    });

    if(completions){
      var completion = completions[0];
      content.push(<FillIn completions={completions}
                           key="fill-in"
                           setAnswer={this.setAnswer} />);
    }

    var choices = this.state.questions.filter((question)=>{
      return question.type === 'choice';
    });
    if(choices)content.push(<Choice choices={choices}
                                    key="choice"
                                    setAnswer={this.setAnswer}/>);

    var multis = this.state.questions.filter((question)=> {
      return question.type === 'multi';
    });
    if(multis)content.push(<Multi multis={multis}
                                  key="multi"
                                  setAnswer={this.setAnswer}/>);

    var checkings = this.state.questions.filter((question)=> {
      return question.type === 'checking';
    });
    if(checkings)content.push(<Checking checkings={checkings}
                                        key="checking"
                                        setAnswer={this.setAnswer}/>);

    return (
    <div>
      <h1>{this.state.paperName}</h1>
      <div className="contest-paper" >
        {content}
      </div>
      <div className="footer">
        <button className="btn " onClick={this.submitAnswer}>提交答案</button>
      </div>
    </div>

    );
  }

});

module.exports = ContestPaperDetail;