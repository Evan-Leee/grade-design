'use strict';

var RunningResult = React.createClass({
  render() {
    var resultText = this.props.quiz.result;

    return (
        <div className="runningResult tab">
          <div className="result">
            <label>运行结果为:</label>
            <div className="content">
              {resultText}
            </div>
          </div>

        </div>
    );
  }
});

module.exports = RunningResult;