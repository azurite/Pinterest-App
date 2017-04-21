const React = require("react");
const { func, bool } = require("prop-types");
const { pin } = require("../nontrivial-prop-types");
const { Image } = require("react-bootstrap");

const styles = require("./styles.css");

const Pin = function(props) {
  let { id, image_url, description, liked_by } = props.data;
  let { remove, spinner } = props;
  return(
    <div className={styles.pinContainer}>
      <Image className={styles.pinImage} src={image_url} responsive/>
      <hr/>
      <div className={styles.descContainer}>
        <h3>{description}</h3>
        <span className="pull-right">
          <i className={"fa fa-heart " + styles.pointer}/>
          {" " + liked_by.length}
        </span>
        {
          remove &&
          <i className={"fa fa-trash-o " + styles.pointer} onClick={remove.bind(null, id)}/>
        }
        {" "}
        {
          spinner &&
          <i className="fa fa-spinner fa-spin"/>
        }
        <div className={styles.clear}/>
      </div>
    </div>
  );
};

Pin.propTypes = {
  data: pin,
  remove: func,
  spinner: bool
};

module.exports = Pin;
