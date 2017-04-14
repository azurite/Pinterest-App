const React = require("react");
const ReactDOM = require("react-dom");
const { AppContainer } = require("react-hot-loader");

const renderApp = require("./app");

const render = (renderApp) => {
  if(module.hot) {
    ReactDOM.render(
      <AppContainer>
        {renderApp("client")}
      </AppContainer>,
      document.getElementById("app")
    );
  }
  else {
    ReactDOM.render(
      renderApp("client"),
      document.getElementById("app")
    );
  }
};

if(module.hot) {
  module.hot.accept("./app", () => {
    const nextApp = require("./app");
    render(nextApp);
  });
}

render(renderApp);
