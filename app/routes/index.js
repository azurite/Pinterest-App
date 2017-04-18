const path = require("path");
const { renderToString } = require("react-dom/server");
const express = require("express");
const router = express.Router();

const renderApp = require("../../client/js/app");
const configureStore = require("../../client/js/store/configureStore");
const initialState = require("../../client/js/store/initialState");
const updateUser = require("../../client/js/actions/user");

const assets = require("./serve-bundles")({
  path: path.join(process.cwd(), "build", "client"),
  sort: {
    scripts: ["manifest", "vendor", "styles", "app"]
  }
});

router.get("*", (req, res) => {
  const store = configureStore(initialState);
  const options = {
    store: store,
    url: req.url,
    context: {}
  };

  if(req.isAuthenticated()) {
    store.dispatch(updateUser(req.user.normalize()));
  }

  const html = renderToString(
    renderApp("server", options)
  );

  if(options.context.url) {
    res.redirect(options.context.url);
  }
  else {
    res.render("index", {
      app: html,
      assets: assets,
      preloadedState: store.getState()
    });
  }
});

module.exports = function() {
  return router;
};
