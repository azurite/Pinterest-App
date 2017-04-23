const React = require("react");
const { connect } = require("react-redux");
const { string, func, bool, object } = require("prop-types");
const { request } = require("../nontrivial-prop-types");
const { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } = require("react-bootstrap");

const RequestButton = require("../Utils/RequestButton");
const ErrorMessage = require("../Utils/ErrorMessage");

const styles = require("./styles.css");
const { updateForm, purgeForm } = require("../../lib/redux-form");
const { login } = require("../../actions/ajax");

const Login = React.createClass({
  propTypes: {
    isLoggedIn: bool,
    username: string.isRequired,
    password: string.isRequired,
    update: func.isRequired,
    login: func.isRequired,
    cleanup: func.isRequired,
    loginRequest: request,
    history: object
  },
  componentDidMount: function() {
    if(this.props.isLoggedIn) {
      this.props.history.replace("/user");
    }
  },
  componentWillUnmount: function() {
    this.props.cleanup();
  },
  render: function() {
    let { username, password, update, login, loginRequest } = this.props;
    return(
      <Grid className="mainGrid" fluid>
        <Row className={styles.loginContainer}>
          <Col md={4} sm={8} xs={10} mdOffset={4} smOffset={2} xsOffset={1}>
            <h3 className="text-center">Native Login</h3>
            <ErrorMessage request={loginRequest}/>
            <Form onSubmit={login}>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  value={username}
                  onChange={update}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={password}
                  onChange={update}
                />
              </FormGroup>
              <RequestButton bsStyle="primary" type="submit" request={loginRequest}>
                Login
              </RequestButton>
            </Form>
            <div className={styles.socialLogin}>
              <h3 className={"text-center " + styles.socialLoginTitle}>Social Media Login</h3>
              <a href="/auth/github">
                <Button
                  bsSize="large"
                  bsStyle="primary"
                  className={styles.socialLink + " " + styles.githubLink}
                  block>
                  Github <i className="fa fa-github"/>
                </Button>
              </a>
              <a href="auth/twitter">
                <Button
                  bsSize="large"
                  bsStyle="primary"
                  className={styles.socialLink}
                  block>
                  Twitter <i className="fa fa-twitter"/>
                </Button>
              </a>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    isLoggedIn: !!state.user,
    username: state.login.username,
    passsword: state.login.password,
    loginRequest: state.loginRequest
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    update: function(e) {
      dispatch(updateForm("login", e.target.name, e.target.value));
    },
    login: function(e) {
      e.preventDefault();
      dispatch(login(ownProps));
    },
    cleanup: function() {
      dispatch(purgeForm("login"));
    },
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
