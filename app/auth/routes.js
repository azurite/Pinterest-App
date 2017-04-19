const debug = require("debug")("pinterest-app");
const passport = require("passport");
const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const validateInput = require("../validation");

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
      (req, res, next) => {
        User.unlinkOauth(req.user, provider, (err) => {
          if(err) {
            return next(err);
          }
          res.status(204).end();
        });
      }
    );
  });

  router.post(
    "/auth/local/login",
    validateInput("login"),
    passport.authenticate("local"),
    (req, res) => {
      res.send(req.user.normalize());
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
    validateInput("register"),
    (req, res, next) => {
      if(req.isAuthenticated()) {
        User.linkAccount(req.user, req.body, (err) => {
          if(err) {
            return next(err);
          }
          res.status(204).end();
        });
      }
      else {
        const info = {
          local: {
            username: req.body.username,
            email: req.body.email
          }
        };
        User.register(new User(info), req.body.password, (err) => {
          if(err) {
            return next(err);
          }
          next();
        });
      }
    },
    passport.authenticate("local"),
    (req, res) => {
      res.send(req.user.normalize());
    }
  );

  router.delete(
    "/auth/local/unlink",
    ensureAuth,
    (req, res, next) => {
      User.unlinkAccount(req.user, (err) => {
        if(err) {
          return next(err);
        }
        res.status(204).end();
      });
    }
  );

  router.use(function(err, req, res, next) { // eslint-disable-line
    if(err.status) {
      res.status(err.status);
    }
    debug("error: %O", err);
    res.send(err);
  });

  return router;
};
