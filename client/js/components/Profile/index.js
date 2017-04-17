const React = require("react");
const { object, bool } = require("prop-types");
const { connect } = require("react-redux");
const { Grid, Row, Col, Image } = require("react-bootstrap");

const styles = require("./styles.css");

const Profile = React.createClass({
  propTypes: {
    user: object,
    isLoggedIn: bool.isRequired
  },
  componentDidMount: function() {
    // redirect if not logged in
  },
  render: function() {
    let { user } = this.props;
    return(
      <Grid fluid>
        <Row>
          <Col md={4} sm={4} xs={12}>
            <div className={styles.profileContainer}>
              <Image className={styles.thumbnail} src={user.image_url} circle responsive/>
              <h3 className="text-center">{user.username}</h3>
              <hr/>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    user: state.user || {},
    isLoggedIn: !!state.user
  };
};

module.exports = connect(
  mapStateToProps
)(Profile);
