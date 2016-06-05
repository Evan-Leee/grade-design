'use strict';


var fillIn = React.createClass({

  handleClick: function (evt){
    var name = evt.target.name;
    var i = document.getElementsByName(name).length;
    var answer = [];
    while( --i >= 0 ){
      answer.push(document.getElementsByName(name)[i].value);
    }
    this.props.setAnswer(name, answer);
  },

  render(){

    var completions = this.props.completions.map((completion, index)=> {
      var blanks = [];
      var i = completion.option.number;
      while(i--)blanks.push(
        <input type="text"
               name={completion.name}
               className="form-control"
               onChange={this.handleClick}
               key={i} />
      );

      return (
        <dd key={index}>
          <label>{index + 1}. {completion.desc}:</label>
          <label>
            {blanks}
          </label>
        </dd>
      );

    });

    return (
      <div className="panel panel-default fill-in">
        <div className="panel-heading">
          <h3>填空题(每题10分,共{this.props.completions.length * 10}分)</h3>
        </div>
        <div className="panel-body">
          <dl>
          {completions}
          </dl>
        </div>
      </div>
    );
  }

});

module.exports = fillIn;