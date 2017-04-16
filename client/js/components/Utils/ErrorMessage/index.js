const React = require("react");
const { request } = require("../../nontrivial-prop-types");
const { Alert } = require("react-bootstrap");

const ErrorMessage = React.createClass({
  propTypes: {
    request: request
  },
  getInitialState: function() {
    return {
      alertVisible: true
    };
  },
  isNonEmptyObject: function(val) {
    if(typeof val !== "object" || !val) { return false; }
    for(const p in val) { return true; }
    return false;
  },
  componentWillReceiveProps: function(nextProps) {
    if(!this.isNonEmptyObject(this.props.request.error) && this.isNonEmptyObject(nextProps.request.error)) {
      this.setState({
        alertVisible: true
      });
    }
  },
  render: function() {
    let { request } = this.props;
    return(
      this.state.alertVisible && this.isNonEmptyObject(request.error) &&
      <Alert bsStyle="danger" onDismiss={() => { this.setState({ alertVisible: false }); }}>
        <p>{request.error.message}</p>
      </Alert>
    );
  }
});

module.exports = ErrorMessage;
