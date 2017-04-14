const React = require("react");
const { string, node } = require("prop-types");
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
  render: function() {
    return(
      <Navbar className={styles.sharpEdged}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Pinterest Clone</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItemLink to="/login">Login</NavItemLink>
            <NavItemLink to="/register">Register</NavItemLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports = Main;
