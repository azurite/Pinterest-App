const React = require("react");
const ReactDOM = require("react-dom");
const { AppContainer } = require("react-hot-loader");

const opt = { store: require("./store/configureStore")(require("./store/getInitialState")()) };
const renderApp = require("./app");
require("../css/index.css");

const render = (renderApp, opt) => {
  if(module.hot) {
    ReactDOM.render(
      <AppContainer>
        {renderApp("client", opt)}
      </AppContainer>,
      document.getElementById("app")
    );
  }
  else {
    ReactDOM.render(
      renderApp("client", opt),
      document.getElementById("app")
    );
  }
};

if(module.hot) {
  module.hot.accept("./app", () => {
    const nextApp = require("./app");
    render(nextApp, opt);
  });
}

render(renderApp, opt);
