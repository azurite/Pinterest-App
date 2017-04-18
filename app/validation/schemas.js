const Joi = require("joi");

const username = Joi.string().required();
const password = Joi.string().min(8).max(32).required();
const email = Joi.string().email().required();

const registerSchema = Joi.object().keys({
  username: username,
  email: email,
  password: password,
  confirm_password: password
});

const loginSchema = Joi.object().keys({
  username: username,
  password: password
});

module.exports = {
  registerSchema,
  loginSchema
};
