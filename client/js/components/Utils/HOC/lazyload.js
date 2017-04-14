const React = require("react");
const Async = require("../AsyncComponent");

const lazyload = function(loader, props) {
  if(typeof loader !== "function") {
    throw new TypeError("loader must be a function. Instead got: " + typeof loader);
  }
  const AsyncWrapper = React.createClass({
    render: function() {
      return <Async loader={loader} {...props}/>;
    }
  });
  return AsyncWrapper;
};

module.exports = lazyload;
