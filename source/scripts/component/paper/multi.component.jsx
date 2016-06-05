'use strict';

var Multi = React.createClass({

  handleChange: function (evt){
    var name = evt.target.name;
    var i = document.getElementsByName(name).length;
    var answer = [];
    while( --i >= 0 ){
      if(document.getElementsByName(name)[i].checked){
        answer.push(document.getElementsByName(name)[i].value);
      }else {
        var index = answer.indexOf(document.getElementsByName(name)[i].value);
        if(index !== -1)answer.splice(index, 1);
      }

    }
    this.setAnswer(name, answer);
  },

  render() {
    var Multis = this.props.multis.map((multi, index) => {
      var options = Object.keys(multi.option.content).map((opt, index) => {

        return (
          <dd key={index}>
            <input type="checkbox"
                   name={multi.name}
                   value={opt}
                   onChange={this.handleChange}/>
            ({opt}){multi.option.content[opt]}
          </dd>
        )
      });

      return (
        <div className="panel-body" key={index}>
          <label>{index + 1}.{multi.desc}:</label>
          <dl>
            {options}
          </dl>
        </div>
      );
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>多选题(每题15分,共{this.props.multis.length * 15}分)</h3>
        </div>
        {Multis}
      </div>
    )
  }

});

module.exports = Multi;