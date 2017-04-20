const React = require("react");
const { connect } = require("react-redux");
const { string, node, bool, object } = require("prop-types");
const { Navbar, Nav } = require("react-bootstrap");
const { Link, NavLink } = require("react-router-dom");

const styles = require("./styles.css");

const NavItemLink = function({ to, children }) {
  return(
    <li role="presentation">
      <NavLink to={to}>
        {children}
      </NavLink>
    </li>
  );
};

NavItemLink.propTypes = {
  to: string,
  children: node
};

const Main = React.createClass({
  propTypes: {
    isLoggedIn: bool,
    history: object
  },
  componentDidMount: function() {
    if(this.props.isLoggedIn) {
      this.props.history.replace("/user");
    }
  },
  render: function() {
    let { isLoggedIn } = this.props;
    return(
      <Navbar className={styles.sharpEdged}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Pinterest Clone</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          {
            !isLoggedIn &&
            <Nav pullRight>
              <NavItemLink to="/login">Login</NavItemLink>
              <NavItemLink to="/register">Register</NavItemLink>
            </Nav>
          }
          {
            isLoggedIn &&
            <Nav pullRight>
              <NavItemLink to="/user">Profile</NavItemLink>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    isLoggedIn: !!state.user
  };
};

module.exports = connect(
  mapStateToProps
)(Main);
