const React = require("react");
const { connect } = require("react-redux");
const { func, shape, number } = require("prop-types");
const { request } = require("../nontrivial-prop-types");
const Masonry = require("react-masonry-component");
const { Grid, Row, Col } = require("react-bootstrap");

const ErrorMessage = require("../Utils/ErrorMessage");
const Pin = require("../Pin");

const styles = require("./styles.css");
const masonryOptions = require("../masonry-options");
const { callOnce, debounce } = require("../../lib/tools");
const { pinwall } = require("../../actions/ajax");

const addScrollListenerOnce = callOnce(function(listener) {
  window.onscroll = listener;
});

const Pinwall = React.createClass({
  propTypes: {
    pinwall: shape({
      request: request,
      page: number.isRequired
    }),
    paginate: func.isRequired
  },
  componentDidMount: function() {
    addScrollListenerOnce(debounce(this.props.paginate, 200));

    let { data } = this.props.pinwall;
    if(!data) {
      this.props.paginate();
    }
  },
  render: function() {
    let { request } = this.props.pinwall;
    return(
      <Grid className="mainGrid" fluid>
        <Row>
          <Col md={10} sm={10} xs={10} mdOffset={1} smOffset={1} xsOffset={1}>
            <div className={styles.pinwallContainer}>
              <ErrorMessage request={request}/>
              <Masonry options={masonryOptions}>
                {
                  request.data &&
                  request.data.items &&
                  request.data.items.map((pin) => {
                    return(
                      <Pin key={pin.id} data={pin}/>
                    );
                  })
                }
              </Masonry>
              {
                !request.isPending &&
                request.data && request.data.totalResults === 0 &&
                <p>No results</p>
              }
              {
                request.isPending &&
                <i className="fa fa-spinner fa-spin fa-3x"/>
              }
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    pinwall: state.pinwall
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    paginate: function() {
      dispatch(pinwall(ownProps));
    }
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pinwall);
