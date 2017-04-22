const Joi = require("joi");
const debug = require("debug")("pinterest-app");
const { loginSchema, registerSchema, pinUploadSchema, pinActionSchema, pinWallSchema } = require("./schemas");

function createError(msg, opt = {}) {
  return Object.assign(
    {
      error: true,
      message: msg
    },
    opt
  );
}

module.exports = function validateInput(_for, target) {
  if(target && ["body", "query"].indexOf(target) === -1) {
    throw new TypeError("Invalid target argument. Must be either \"body\" or \"query\"");
  }

  return function(req, res, next) {
    switch(_for) {

      case "login":
        Joi.validate(req.body, loginSchema, (err) => {
          if(err) {

            debug("invalid user input: %s", err.details[0].message);

            return next(createError(err.details[0].message));
          }
          next();
        });
        break;

      case "register":
        Joi.validate(req.body, registerSchema, (err) => {
          if(err) {

            debug("invalid user input: %s", err.details[0].message);

            return next(createError(err.details[0].message));
          }

          if(req.body.password !== req.body.password_confirm) {

            debug("passwords dont match");

            return next(createError("Passwords don't match"));
          }
          next();
        });
        break;

      case "pin-upload":
        Joi.validate(req.body, pinUploadSchema, (err) => {
          if(err) {

            debug("invalid pin input: %s", err.details[0].message);

            return next(createError(err.details[0].message));
          }
          next();
        });
        break;

      case "pin-action":
        Joi.validate(req[target], pinActionSchema, (err) => {
          if(err) {

            debug("invalid pin action input: %s", err.details[0].message);

            return next(createError(err.details[0].message));
          }
          next();
        });
        break;

      case "pinwall":
        Joi.validate(req.query, pinWallSchema, (err) => {
          if(err) {

            debug("invalid pinwall input: %s", err.details[0].message);

            return next(createError(err.details[0].message));
          }
          next();
        });
        break;
    }
  };
};
