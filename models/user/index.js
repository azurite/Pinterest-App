const mongoose = require("mongoose");

const passwordPlugin = require("./plugins/password-plugin");
const passportLocalPlugin = require("./plugins/passport-local-plugin");
const passportOauthPlugin = require("./plugins/passport-oauth-plugin");

const User = mongoose.Schema({
  local: {
    username: { type: String, unique: true, sparse: true, trim: true },
    email: { type: String, unique: true, sparse: true, trim: true },
    image_url: { type: String, default: "/media/dummy_image.png" },
    hash: { type: String, select: false },
    salt: { type: String, select: false }
  },
  github: {
    id: { type: String },
    username: { type: String, trim: true },
    image_url: { type: String, default: "/media/dummy_image.png" }
  },
  twitter: {
    id: { type: String },
    username: { type: String, trim: true },
    image_url: { type: String, default: "/media/dummy_image.png" }
  },
  login_method: String
});

User.plugin(passwordPlugin, {
  usernameField: "local.username",
  hashField: "local.hash",
  saltField: "local.salt"
});

User.plugin(passportLocalPlugin, {
  uniqueFields: ["local.username", "local.email"],
  usernameField: "local.username",
  emailField: "local.email",
  hashField: "local.hash",
  saltField: "local.salt"
});

User.plugin(passportOauthPlugin);

module.exports = mongoose.model("user", User);