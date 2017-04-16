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
    passoword_confirm: ""
  },
  registerRequest: createRequest()
};
