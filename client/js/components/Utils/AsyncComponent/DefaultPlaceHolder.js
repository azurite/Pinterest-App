const React = require("react");
const { number, string } = require("prop-types");

const styles = require("./styles.css");

const DefaultPlaceholder = function({ size, height = "200px" }) {
  return (
    <div className={styles.defaultPlaceHolder} style={{ height }}>
      <div className={styles.spinner}>
        <i className={"fa fa-spinner fa-spin white" + (size ? " fa-" + size + "x" : "")}/>
      </div>
    </div>
  );
};

DefaultPlaceholder.propTypes = {
  size: number,
  height: string
};

module.exports = DefaultPlaceholder;
