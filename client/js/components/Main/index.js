const React = require("react");

const styles = require("./styles.css");

const Main = React.createClass({
  render: function() {
    return(
      <h3 className={styles.helloWorld}>
        Hello World
      </h3>
    );
  }
});

module.exports = Main;
