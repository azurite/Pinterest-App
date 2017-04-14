const React = require("react");
const { number } = React.PropTypes;

const styles = require("./styles.css");

const DefaultPlaceholder = function({ size }) {
  return (
    <div className={styles.defaultPlaceHolder}>
      <div className={styles.spinner}>
        <i className={"fa fa-spinner fa-spin" + (size ? " fa-" + size + "x" : "")}/>
      </div>
    </div>
  );
};

DefaultPlaceholder.propTypes = {
  size: number
};

module.exports = DefaultPlaceholder;
