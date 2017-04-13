const React = require("react");
const ReactDOM = require("react-dom");
const { AppContainer } = require("react-hot-loader");

const App = require("./components/Main");

const render = (App) => {
  if(module.hot) {
    ReactDOM.render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.getElementById("app")
    );
  }
  else {
    ReactDOM.render(
      <App/>,
      document.getElementById("app")
    );
  }
};

render(App);


if(module.hot) {
  module.hot.accept("./components/Main", () => {
    const nextRoutes = require("./components/Main");
    render(nextRoutes);
  });
}
