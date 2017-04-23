const ReduxForm = require("../lib/redux-form");
const ReduxRequest = require("../lib/redux-request");
const composeReducers = require("./compose");

const types = require("../actions/types");

const likeUnlikePin = ReduxRequest.createReducer("like-unlike-pin");

const pinwall = composeReducers({
  request: ReduxRequest.createReducer("pinwall"),
  data: require("./pinwall"),
  page: (p, action) => action.type === types.INCR_PAGE ? ++p : p
});

const login = ReduxForm.createReducer("login");
const loginRequest = ReduxRequest.createReducer("login");
const register = ReduxForm.createReducer("register");
const registerRequest = ReduxRequest.createReducer("register");

const user = require("./user");

const logoutRequest = ReduxRequest.createReducer("logout");

const unlinkAccount = composeReducers({
  request: ReduxRequest.createReducer("unlink"),
  prov: (state, action) => action.type === types.CLICK_UNLINK ? action.prov : state
});

const removePin = composeReducers({
  request: ReduxRequest.createReducer("remove-pin"),
  pinId: (state, action) => action.type === types.CLICK_REMOVE_PIN ? action.pinId: state
});

const addPin = composeReducers({
  request: ReduxRequest.createReducer("add-pin"),
  pin: ReduxForm.createReducer("pin")
});

const reducer = composeReducers({
  likeUnlikePin,
  pinwall,
  login,
  loginRequest,
  register,
  registerRequest,
  user,
  logoutRequest,
  unlinkAccount,
  removePin,
  addPin
});

module.exports = reducer;
