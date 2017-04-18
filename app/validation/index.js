const Joi = require("joi");
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
            return next(createError(err.details.message));
          }
          next();
        });
        break;
      case "register":
        Joi.validate(req.body, registerSchema, (err) => {
          if(err) {
            return next(createError(err.details.message));
          }
          if(req.body.password !== req.body.confirm_password) {
            return next(createError("Passwords don't match"));
          }
          next();
        });
        break;
    }
  };
};
