const React = require("react");
const { Link } = require("react-router");
const { object, bool, string, func, node } = require("prop-types");
const { connect } = require("react-redux");
const { Grid, Row, Col, Image, Button } = require("react-bootstrap");

const styles = require("./styles.css");

function UnlinkAccount(props) {
  let child, { provider, unlink, ...rest } = props;
  switch(provider) {
    case "local":
      child = "Unlink Local Account";
      break;
    case "twitter":
      child = "Unlink Twitter Account";
      break;
    case "github":
      child = "Unlink Github Account";
      break;
  }
  return(
    <Button {...rest} onClick={unlink}>
      {child}
    </Button>
  );
}

UnlinkAccount.propTypes = {
  provider: string.isRequired,
  unlink: func.isRequired
};

function LinkAccount(props) {
  let { provider, ...rest } = props;
  switch(provider) {
    case "local":
      return(
        <Link to="/register?linkAccount">
          <Button {...rest}>
            Link Local Account
          </Button>
        </Link>
      );
    case "github":
      return(
        <a href="/auth/github">
          <Button {...rest}>
            Link Github <i className="fa fa-github"/>
          </Button>
        </a>
      );
    case "twitter":
      return(
        <a href="/auth/twitter">
          <Button {...rest}>
            Link Twitter <i className="fa fa-twitter"/>
          </Button>
        </a>
      );
  }
}

LinkAccount.propTypes = {
  provider: string.isRequired,
};

function Li(props) {
  return(
    <li>{props.children}</li>
  );
}

Li.propTypes = {
  children: node
};

const Profile = React.createClass({
  propTypes: {
    user: object,
    isLoggedIn: bool.isRequired,
    logout: func.isRequired,
    unlink: func.isRequired,
    history: object
  },
  componentDidMount: function() {
    if(!this.props.isLoggedIn) {
      this.props.history.replace("/login");
    }
  },
  otherAccounts: function() {
    let { connected_accounts, login_method } = this.props.user;
    let { unlink } = this.props;
    let providers = ["local", "github", "twitter"];

    return providers.map((provider, i) => {
      if(provider !== login_method) {
        if(connected_accounts.indexOf(provider) !== -1) {
          return(
            <UnlinkAccount
              block
              key={this.genKey(i)}
              provider={provider}
              unlink={unlink}
            />
          );
        }
        else {
          return(
            <LinkAccount
              block
              key={this.genKey(i)}
              provider={provider}
            />
          );
        }
      }
    }).filter(f => f);
  },
  genKey: function(v) {
    return (v + Math.random() + "").substr(0, 5);
  },
  render: function() {
    let { user, isLoggedIn } = this.props;
    return(
      <Grid fluid>
        {
          isLoggedIn &&
          <Row>
            <Col md={4} sm={4} xs={12}>
              <div className={styles.profileContainer}>
                <Image className={styles.thumbnail} src={user.image_url} circle responsive/>
                <h3 className="text-center">{user.username}</h3>
                <hr/>
              </div>
            </Col>
            <Col md={5} sm={5} xs={12}>
              {/*Pins ad add pins comes here*/}
            </Col>
            <Col md={3} sm={3} xs={12}>
              <h4>Manage Accounts</h4>
              {this.otherAccounts()}
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
    isLoggedIn: !!state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    logout: function(e) {

    },
    unlink: function(e) {

    }
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
