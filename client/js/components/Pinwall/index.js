const React = require("react");
const { connect } = require("react-redux");
const { func, shape, number, bool, string } = require("prop-types");
const { request } = require("../nontrivial-prop-types");
const Masonry = require("react-masonry-component");
const { Grid, Row, Col } = require("react-bootstrap");

const ErrorMessage = require("../Utils/ErrorMessage");
const Pin = require("../Pin");

const styles = require("./styles.css");
const masonryOptions = require("../masonry-options");
const { callOnce, debounce } = require("../../lib/tools");
const { pinwall, toggleLike } = require("../../actions/ajax");

const addScrollListenerOnce = callOnce(function(listener) {
  window.onscroll = listener;
});

const Pinwall = React.createClass({
  propTypes: {
    isLoggedIn: bool,
    userId: string,
    pinwall: shape({
      request: request,
      page: number.isRequired
    }),
    paginate: func.isRequired,
    toggleLike: func.isRequired
  },
  componentDidMount: function() {
    addScrollListenerOnce(debounce(this.props.paginate, 200));

    let { data } = this.props.pinwall;
    if(!data.items.length) {
      this.props.paginate();
    }
  },
  render: function() {
    let { request, data } = this.props.pinwall;
    let { isLoggedIn, userId, toggleLike } = this.props;
    return(
      <Grid className="mainGrid" fluid>
        <Row>
          <Col md={10} sm={10} xs={10} mdOffset={1} smOffset={1} xsOffset={1}>
            <ErrorMessage request={request}/>
            <Masonry options={masonryOptions} className={styles.masonryContainer}>
              {
                data.items.map((pin) => {
                  return(
                    <Pin
                      toggleLike={isLoggedIn ? toggleLike : null}
                      liked={pin.liked_by.indexOf(userId) >= 0}
                      key={pin.id}
                      data={pin}
                    />
                  );
                })
              }
            </Masonry>
            {
              !request.isPending &&
              data && data.totalResults === 0 &&
              <p>No results</p>
            }
            {
              request.isPending &&
              <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x white"/>
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    pinwall: state.pinwall,
    isLoggedIn: !!state.user,
    userId: state.user && state.user.id
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    paginate: function() {
      dispatch(pinwall(ownProps));
    },
    toggleLike: function(action, pinId) {
      dispatch(toggleLike(action, pinId));
    }
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pinwall);
