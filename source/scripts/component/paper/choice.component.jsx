'use strict';

var Choice = React.createClass({

  handleChange: function (evt){
    var name = evt.target.name;
    var answer = evt.target.value;
    this.props.setAnswer(name, answer);
  },

  render(){
    var choices = this.props.choices.map((choice, index)=> {
      var options = Object.keys(choice.option.content).map((opt, index) => {
        return (
          <dd key={index}>
            <input type="radio"
                   name={choice.name}
                   value={opt}
                   onChange={this.handleChange}/>
            ({opt }){choice.option.content[opt]}
          </dd>
        )
      });
      return (
        <div className="panel-body" key={index}>
          <label>{index + 1}.{choice.desc}:</label>
          <dl>
            {options}
          </dl>
        </div>
      )
    });


    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>单选题(每题10分,共{this.props.choices.length * 10}分)</h3>
        </div>
        {choices}
      </div>
    )
  }

});

module.exports = Choice;