const ReduxForm = require("../lib/redux-form");
const ReduxRequest = require("../lib/redux-request");
const composeReducers = require("./compose");

const login = ReduxForm.createReducer("login");
const loginRequest = ReduxRequest.createReducer("login");
const register = ReduxForm.createReducer("register");
const registerRequest = ReduxRequest.createReducer("register");

const user = require("./user");

const reducer = composeReducers({
  login,
  loginRequest,
  register,
  registerRequest,
  user
});

module.exports = reducer;