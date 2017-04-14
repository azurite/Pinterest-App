const React = require("react");
const { BrowserRouter } = require("react-router-dom");
const { StaticRouter } = require("react-router");
const routes = require("./routes");

function renderApp(env, opt = {}) {
  switch(env) {
    case "server":
      return(
        <StaticRouter location={opt.url} context={opt.context}>
          {routes(opt.store)}
        </StaticRouter>
      );

    case "client":
      return(
        <BrowserRouter>
          {routes(opt.store)}
        </BrowserRouter>
      );

    default:
      throw new Error("env must be either \"client\" or \"server\". Instead got: " + env);
  }
}

module.exports = renderApp;
