const React = require("react");
const { func, bool } = require("prop-types");
const { pin } = require("../nontrivial-prop-types");
const { Image } = require("react-bootstrap");

const styles = require("./styles.css");
const { debounce } = require("../../lib/tools");

const Pin = React.createClass({
  propTypes: {
    toggleLike: func,
    liked: bool,
    data: pin,
    remove: func,
    spinner: bool
  },
  replaceBrokenImage: function(e) {
    e.target.src = "/media/pin_placeholder.png";
    this.forceUpdate();
  },
  render: function() {
    let { id, image_url, description, liked_by } = this.props.data;
    let { remove, spinner, toggleLike, liked } = this.props;
    return(
      <div className={styles.pinContainer}>
        <Image
          onError={this.replaceBrokenImage}
          className={styles.pinImage}
          src={image_url}
          responsive
        />
        <hr/>
        <div className={styles.descContainer}>
          <h3>{description}</h3>
          <span className="pull-right">
            <i
              className={"fa fa-heart " + styles.pointer + (liked ? " " + styles.liked : "")}
              onClick={toggleLike ? debounce(
                toggleLike.bind(null, liked ? "unlike" : "like", id),
                1000,
                true
              ) : f => f}
            />
            {" " + liked_by.length}
          </span>
          {
            remove &&
            <i
              className={"fa fa-trash-o " + styles.pointer}
              onClick={remove.bind(null, id)}
            />
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
  }
});

module.exports = Pin;
