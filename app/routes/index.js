const path = require("path");
const { renderToString } = require("react-dom/server");
const express = require("express");
const router = express.Router();

const renderApp = require("../../client/js/app");
const configureStore = require("../../client/js/store/configureStore");
const initialState = require("../../client/js/store/initialState");
const { updateUser } = require("../../client/js/actions/user");

const assets = require("./serve-bundles")({
  path: path.join(process.cwd(), "build", "client"),
  sort: {
    scripts: ["manifest", "vendor", "styles", "app"]
  }
});

// since req.user is not a plain JS object on the server but redux only accepts plain JS object
function toPlainObject(o) {
  return JSON.parse(JSON.stringify(o));
}

router.get("*", (req, res) => {
  const store = configureStore(initialState);
  const options = {
    store: store,
    url: req.url,
    context: {}
  };

  if(req.isAuthenticated()) {
    store.dispatch(updateUser(toPlainObject(req.user.normalize())));
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
