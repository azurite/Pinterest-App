const { createRequest } = require("../lib/redux-request");

module.exports = {
  login: {
    username: "",
    password: ""
  },
  loginRequest: createRequest(),
  register: {
    username: "",
    email: "",
    password: "",
    password_confirm: ""
  },
  registerRequest: createRequest(),
  user: null,
  logoutRequest: createRequest()
};
