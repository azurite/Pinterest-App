const passport = require("passport");
const express = require("express");
const router = express.Router();

function ensureAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.status(401).end();
}

module.exports = function() {

  let oauthProviders = ["github", "twitter"];

  oauthProviders.forEach((provider) => {
    router.get(
      "/auth/" + provider,
      passport.authenticate(provider)
    );

    router.get(
      "/auth/" + provider + "/callback",
      passport.authenticate(
        provider,
        { successRedirect: "/user", failureRedirect: "/login" }
      )
    );

    router.delete(
      "/auth/" + provider + "/unlink",
      ensureAuth,
      (req, res) => {
        // unlink social account if it is not the same as req.user.login_method
      }
    );
  });

  router.post(
    "/auth/local/login",
    passport.authenticate("local"),
    (req, res) => {
      res.send(req.user.normalize("local-profile"));
    }
  );

  router.post(
    "/auth/local/logout",
    ensureAuth,
    (req, res) => {
      req.logout();
      req.sesion.destroy();
      res.status(204).end();
    }
  );

  router.post(
    "/auth/local/register",
    (req, res) => {
      if(req.isAuthenticated()) {
        // link local account only if it doesn't exist already
      }
      else {
        // register new account
      }
    }
  );

  router.delete(
    "/auth/local/unlink",
    ensureAuth,
    (req, res) => {
      // unlink local accout
    }
  );

  return router;
};
