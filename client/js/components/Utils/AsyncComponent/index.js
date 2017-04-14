const React = require("react");
const { func, node, number, string } = require("prop-types");
const DefaultPlaceholder = require("./DefaultPlaceHolder");

const AsyncComponent = React.createClass({
  propTypes: {
    Placeholder: node,
    loader: func.isRequired,
    spinner_size: number,
    height: string
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
    let { Placeholder, spinner_size = 3, height = "400px" } = this.props;
    return Placeholder ? <Placeholder {...this.props}/> : <DefaultPlaceholder height={height} size={spinner_size}/>;
  },
  render: function() {
    let { Component } = this.state;
    return (
      Component ? <Component {...this.props}/> : this.renderPlaceHolder()
    );
  }
});

module.exports = AsyncComponent;
