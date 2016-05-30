'use strict';

var Reflux = require('reflux');
var LogicPuzzleStore = require('../../store/logic-puzzle/logic-puzzle-store');
var LogicPuzzleActions = require('../../actions/logic-puzzle/logic-puzzle-actions');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');

var LogicPuzzle = React.createClass({
  mixins: [Reflux.connect(LogicPuzzleStore)],

  getInitialState: function () {
    return {
      showModal: false
    };
  },

  componentDidMount: function () {
    LogicPuzzleActions.loadItem();
  },

  render: function () {

    return (

        <div className="container-fluid">
          <div className="row">
            {this.props.children}
            <Modal
              show={this.state.showModal}
              dialogClassName="custom-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">提示:</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                时间到,已提交.
              </Modal.Body>
              <Modal.Footer>
                <Button href="dashboard.html">确定</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
    );
  }
});

module.exports = LogicPuzzle;
