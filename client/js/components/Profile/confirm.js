const React = require("react");
const { Modal, Button } = require("react-bootstrap");
const { string, func, node } = React.PropTypes;

const Confirm = React.createClass({
  propTypes: {
    title: string,
    message: string,
    onConfirm: func.isRequired,
    children: node
  },
  getInitialState: function() {
    return { visible: false };
  },
  close: function() {
    this.setState({ visible: false });
  },
  open: function() {
    this.setState({ visible: true });
  },
  onConfirm: function(e) {
    this.props.onConfirm(e);
    this.close();
  },
  render: function() {
    return(
      <div>
        {
          React.Children.map(this.props.children , (child) => {
            return React.cloneElement(child, {
              onClick: this.open
            });
          })
        }
        <Modal show={this.state.visible} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {this.props.message}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>
              Cancel
            </Button>
            <Button bsStyle="danger" onClick={this.onConfirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = Confirm;
