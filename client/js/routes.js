const React = require("react");
const { Route } = require("react-router");
const Main = require("./components/Main");

let Pinwall, Login, Register, Profile;

if(process.env.LAZY_LOAD) {
  const lazyload = require("./components/Utils/HOC/lazyload");
  const loaders = require("./components/loaders");

  Pinwall = lazyload(loaders.Pinwall);
  Login = lazyload(loaders.Login);
  Register = lazyload(loaders.Register);
  Profile = lazyload(loaders.Profile);

}
else {
  Pinwall = require("./components/Pinwall");
  Login = require("./components/Login");
  Register = require("./components/Register");
  Profile = require("./components/Profile");
}

const Routes = React.createClass({
  render: function() {
    return(
      <div>
        <Route path="/" component={Main}/>
        <Route exact path="/" component={Pinwall}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/user" component={Profile}/>
      </div>
    );
  }
});

module.exports = Routes;
