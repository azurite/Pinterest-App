const { createRequest } = require("../lib/redux-request");

module.exports = {
  pinwall: {
    request: createRequest(),
    page: 0
  },
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
  logoutRequest: createRequest(),
  unlinkAccount: {
    request: createRequest(),
    prov: ""
  },
  removePin: {
    request: createRequest(),
    pinId: ""
  },
  addPin: {
    request: createRequest(),
    pin: {
      image_url: "",
      description: ""
    }
  }
};
