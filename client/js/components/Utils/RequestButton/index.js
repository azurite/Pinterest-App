const React = require("react");
const { node } = require("prop-types");
const { Button } = require("react-bootstrap");
const { request } = require("../../nontrivial-prop-types");

const RequestButton = React.createClass({
  propTypes: {
    request: request,
    children: node
  },
  render: function() {
    let { request, children } = this.props;
    return(
      <Button {...this.props} disbled={request.isPending}>
        {request.isPending ? "Loading..." : children}
      </Button>
    );
  }
});

module.exports = RequestButton;
