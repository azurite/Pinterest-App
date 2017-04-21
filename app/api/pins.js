const debug = require("debug")("pinterest-app");
const Pin = require("../../models/pin");
const validateInput = require("../validation");

const express = require("express");
const router = express.Router();

function ensureAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.status(401).end();
}

router.post(
  "/api/pins/upload",
  ensureAuth,
  validateInput("pin-upload"),
  (req, res, next) => {

    const pinInfo = {
      owner: req.user._id,
      image_url: req.body.image_url,
      description: req.body.description
    };
    
    Pin.uploadPin(new Pin(pinInfo), req.user._id, (err) => {
      if(err) {
        return next(err);
      }
      res.status(204).end();
    });
  }
);

router.post(
  "/api/pins/like",
  ensureAuth,
  validateInput("pin-action", "body"),
  (req, res, next) => {
    Pin.likePin(req.body.id, req.user._id, (err) => {
      if(err) {
        return next(err);
      }
      res.status(204).end();
    });
  }
);

router.delete(
  "/api/pins/delete",
  ensureAuth,
  validateInput("pin-action", "query"),
  (req, res, next) => {
    Pin.deletePin(req.query.id, req.user._id, (err) => {
      if(err) {
        return next(err);
      }
      res.status(204).end();
    });
  }
);

router.delete(
  "/api/pins/unlike",
  validateInput("pin-action", "query"),
  ensureAuth,
  (req, res, next) => {
    Pin.unlikePin(req.query.id, req.user._id, (err) => {
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

module.exports = function() {
  return router;
};
