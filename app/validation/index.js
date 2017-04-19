const Joi = require("joi");
const debug = require("debug")("pinterest-app");
const { loginSchema, registerSchema } = require("./schemas");

function createError(msg, opt = {}) {
  return Object.assign(
    {
      error: true,
      message: msg
    },
    opt
  );
}

module.exports = function validateInput(_for) {
  return function(req, res, next) {
    switch(_for) {
      case "login":
        Joi.validate(req.body, loginSchema, (err) => {
          if(err) {

            debug("invalid user input: %s", err.details.message);

            return next(createError(err.details.message));
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
    }
  };
};
