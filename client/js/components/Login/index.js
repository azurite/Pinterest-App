const React = require("react");
const { connect } = require("react-redux");
const { string, func } = require("prop-types");
const { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } = require("react-bootstrap");

const styles = require("./styles.css");
const { createAction } = require("../../lib/redux-form");

const Login = React.createClass({
  propTypes: {
    username: string.isRequired,
    password: string.isRequired,
    update: func.isRequired,
    login: func.isRequired
  },
  render: function() {
    let { username, password, update, login } = this.props;
    return(
      <Grid className="mainGrid" fluid>
        <Row className={styles.loginContainer}>
          <Col md={4} sm={8} xs={10} mdOffset={4} smOffset={2} xsOffset={1}>
            <h3 className="text-center">Native Login</h3>
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
              <Button bsStyle="primary" type="submit">
                Login
              </Button>
            </Form>
            <div className={styles.socialLogin}>
              <h3 className={"text-center " + styles.socialLoginTitle}>Social Media Login</h3>
              <a href="/auth/github">
                <Button
                  bsSize="large"
                  bsStyle="primary"
                  className={styles.socialLink}
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
    username: state.login.username,
    passsword: state.login.password
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    update: function(e) {
      dispatch(createAction("login", e.target.name, e.target.value));
    },
    login: function(e) {
      e.preventDefault();
    }
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
