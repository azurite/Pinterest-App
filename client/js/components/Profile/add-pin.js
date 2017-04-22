const React = require("react");
const { func, string } = require("prop-types");
const { request } = require("../nontrivial-prop-types");
const { Modal, Form, FormGroup, ControlLabel, FormControl, Button } = require("react-bootstrap");

const ErrorMessage = require("../Utils/ErrorMessage");
const RequestButton = require("../Utils/RequestButton");

const AddPin = React.createClass({
  propTypes: {
    image_url: string.isRequired,
    description: string.isRequired,
    add: func.isRequired,
    update: func.isRequired,
    request: request
  },
  getInitialState: function() {
    return { show_modal: false };
  },
  open: function() {
    this.setState({ show_modal: true });
  },
  close: function() {
    this.setState({ show_modal: false });
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.request.success === true) {
      this.close();
    }
  },
  render: function() {
    let { image_url, description, add, update, request } = this.props;
    return(
      <div>
        <Button bsStyle="primary" onClick={this.open}>
          Add Pin
        </Button>
        <Modal show={this.state.show_modal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Pin to your collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ErrorMessage request={request}/>
            <Form onSubmit={add}>
              <FormGroup>
                <ControlLabel>Image Url</ControlLabel>
                <FormControl
                  type="text"
                  name="image_url"
                  value={image_url}
                  onChange={update}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description (optional)</ControlLabel>
                <FormControl
                  type="text"
                  name="description"
                  value={description}
                  onChange={update}
                />
              </FormGroup>
              <RequestButton bsStyle="primary" type="submit" request={request}>
                Add
              </RequestButton>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

module.exports = AddPin;
