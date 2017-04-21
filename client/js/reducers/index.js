const ReduxForm = require("../lib/redux-form");
const ReduxRequest = require("../lib/redux-request");
const composeReducers = require("./compose");

const types = require("../actions/types");

const login = ReduxForm.createReducer("login");
const loginRequest = ReduxRequest.createReducer("login");
const register = ReduxForm.createReducer("register");
const registerRequest = ReduxRequest.createReducer("register");

const user = require("./user");

const logoutRequest = ReduxRequest.createReducer("logout");
const unlinkRequest = ReduxRequest.createReducer("unlink");

const unlinkAccount = composeReducers({
  request: unlinkRequest,
  prov: (state, action) => action.type === types.CLICK_UNLINK ? action.prov : state
});

const removePinRequest = ReduxRequest.createReducer("remove-pin");

const removePin = composeReducers({
  request: removePinRequest,
  pinId: (state, action) => action.type === types.CLICK_REMOVE_PIN ? action.pinId: state
});

const reducer = composeReducers({
  login,
  loginRequest,
  register,
  registerRequest,
  user,
  logoutRequest,
  unlinkAccount,
  removePin
});

module.exports = reducer;
