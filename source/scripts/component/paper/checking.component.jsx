'use strict';

var Checking = React.createClass({

  handleChange: function (evt){
    if(evt.target.checked){
      console.log('name: '+ evt.target.name);
      console.log('answer: ' + evt.target.value)
      //this.props.setAnswer(name, evt.target.value)
    }
  },

  render (){
    var checkings = this.props.checkings.map((checking, index) => {

      return (
        <div className="panel-body" key={index}>
          <dl>
            <dd>
              <label>{index + 1}.{checking.desc}</label>
              <input type="radio"
                     name={checking.name}
                     value="false"
                     onChange={this.handleChange}/><span
              className="glyphicon glyphicon-remove text-danger"></span>
              <input type="radio"
                     name={checking.name}
                     value="true"
                     onChange={this.handleChange}/><span
                className="glyphicon glyphicon-ok text-success"></span>
            </dd>
          </dl>
        </div>
      )
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>判断题(每题10分,共{this.props.checkings.length * 10}分)</h3>
        </div>
        {checkings}
      </div>

    );
  }

});

module.exports = Checking;