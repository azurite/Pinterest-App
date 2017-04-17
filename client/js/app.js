const React = require("react");
const { Provider } = require("react-redux");
const { BrowserRouter } = require("react-router-dom");
const { StaticRouter } = require("react-router");
const Routes = require("./routes");

function renderApp(env, opt = {}) {
  switch(env) {
    case "server":
      return(
        <Provider store={opt.store}>
          <StaticRouter location={opt.url} context={opt.context}>
            <Routes/>
          </StaticRouter>
        </Provider>
      );

    case "client":
      return(
        <Provider store={opt.store}>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </Provider>
      );

    default:
      throw new Error("env must be either \"client\" or \"server\". Instead got: " + env);
  }
}

module.exports = renderApp;
