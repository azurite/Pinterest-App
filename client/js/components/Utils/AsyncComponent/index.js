const React = require("react");
const { func, node, number } = React.PropTypes;
const DefaultPlaceholder = require("./DefaultPlaceHolder");

const AsyncComponent = React.createClass({
  propTypes: {
    Placeholder: node,
    loader: func.isRequired,
    spinner_size: number
  },
  getInitialState: function() {
    return { Component: null };
  },
  componentDidMount: function() {
    this.props.loader().then((Component) => {
      this.setState({ Component });
    });
  },
  renderPlaceHolder: function() {
    let { Placeholder, spinner_size } = this.props;
    return Placeholder ? <Placeholder {...this.props}/> : <DefaultPlaceholder size={spinner_size}/>;
  },
  render: function() {
    let { Component } = this.state;
    return (
      Component ? <Component {...this.props}/> : this.renderPlaceHolder()
    );
  }
});

module.exports = AsyncComponent;
