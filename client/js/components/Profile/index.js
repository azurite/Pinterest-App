const React = require("react");
const { object, bool, func, shape, string } = require("prop-types");
const { connect } = require("react-redux");
const { Grid, Row, Col, Image } = require("react-bootstrap");
const Masonry = require("react-masonry-component");

const RequestButton = require("../Utils/RequestButton");
const ErrorMessage = require("../Utils/ErrorMessage");
const Accounts = require("./accounts");
const Pin = require("../Pin");

const styles = require("./styles.css");
const { request } = require("../nontrivial-prop-types");
const { clickUnlink, clickRemovePin } = require("../../actions/user");
const { unlink, logout, removePin } = require("../../actions/ajax");

const pinStyles = require("../Pin/styles.css");
const masonryOptions = {
  itemSelector: "." + pinStyles.pinContainer,
  columnWidth: 100
};

const Profile = React.createClass({
  propTypes: {
    user: object,
    isLoggedIn: bool.isRequired,
    logoutRequest: request,
    unlinkAccount: shape({
      request: request,
      prov: string
    }),
    logout: func.isRequired,
    unlink: func.isRequired,
    removePin: shape({
      request: request,
      pinId: string
    }),
    remove: func.isRequired,
    history: object
  },
  componentDidMount: function() {
    if(!this.props.isLoggedIn) {
      this.props.history.replace("/login");
    }
  },
  render: function() {
    let { user, isLoggedIn, logoutRequest, unlinkAccount, unlink, logout, removePin, remove } = this.props;
    let providers = ["local", "github", "twitter"];
    return(
      <Grid fluid>
        {
          isLoggedIn &&
          <Row>
            <Col md={6} sm={6} xs={12}>
              <div className={styles.profileContainer}>
                <Image className={styles.thumbnail} src={user.image_url} circle responsive/>
                <h3 className="text-center">{user.username}</h3>
                <hr/>
              </div>
            </Col>
            <Col md={6} sm={6} xs={12}>
              <div className={styles.profileContainer}>
                <h4>Manage Accounts</h4>
                <ErrorMessage request={unlinkAccount.request}/>
                <Accounts
                  connected_accounts={user.connected_accounts}
                  isPending={unlinkAccount.request.isPending}
                  login_method={user.login_method}
                  isClicked={unlinkAccount.prov}
                  className={styles.accountBtn}
                  bsStyle="primary"
                  providers={providers}
                  unlink={unlink}
                  block
                />
                <hr/>
                <RequestButton bsStyle="primary" request={logoutRequest} onClick={logout}>
                  Logout
                </RequestButton>
              </div>
            </Col>
            <Col md={12} sm={12} xs={12}>
              <Masonry options={masonryOptions}>
                {
                  user.pins.map((pin) => {
                    return(
                      <Pin
                        spinner={removePin.request.isPending && removePin.pinId === pin.id}
                        remove={remove}
                        key={pin.id}
                        data={pin}
                      />
                    );
                  })
                }
              </Masonry>
            </Col>
          </Row>
        }
        {
          !isLoggedIn &&
          <p>Redirecting...</p>
        }
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    user: state.user || {},
    isLoggedIn: !!state.user,
    logoutRequest: state.logoutRequest,
    unlinkAccount: state.unlinkAccount,
    removePin: state.removePin
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    logout: function() {
      dispatch(logout(ownProps));
    },
    unlink: function(prov) {
      dispatch(clickUnlink(prov));
      dispatch(unlink());
    },
    remove: function(pinId) {
      dispatch(clickRemovePin(pinId));
      dispatch(removePin());
    }
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
