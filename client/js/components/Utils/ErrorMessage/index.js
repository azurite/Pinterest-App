const React = require("react");
const { object } = require("prop-types");
const { Alert } = require("react-bootstrap");

const ErrorMessage = React.createClass({
  propTypes: {
    error: object
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
  componentWillRecieveProps: function(nextProps) {
    if(!this.isNonEmptyObject(this.props.error) && this.isNonEmptyObject(nextProps.error)) {
      this.setState({
        alertVisible: true
      });
    }
  },
  render: function() {
    let { error } = this.props;
    return(
      this.state.alertVisible && this.isNonEmptyObject(error) &&
      <Alert bsStyle="danger" onDismiss={() => { this.setState({ alertVisible: false }); }}>
        <p>{error.message}</p>
      </Alert>
    );
  }
});

module.exports = ErrorMessage;
