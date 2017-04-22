const Joi = require("joi");

const username = Joi.string().required();
const password = Joi.string().min(8).max(32).required();
const email = Joi.string().email().required();
const objectId = Joi.string().hex().length(24).required();

const registerSchema = Joi.object().keys({
  username: username,
  email: email,
  password: password,
  password_confirm: password
});

const loginSchema = Joi.object().keys({
  username: username,
  password: password
});

const pinUploadSchema = Joi.object().keys({
  image_url: Joi.string().uri().required(),
  description: Joi.string()
});

const pinActionSchema = Joi.object().keys({
  id: objectId
});

const pinWallSchema = Joi.object().keys({
  offset: Joi.number().required(),
  chunkSize: Joi.number().required()
});

module.exports = {
  registerSchema,
  loginSchema,
  pinUploadSchema,
  pinActionSchema,
  pinWallSchema
};
