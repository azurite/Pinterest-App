const { createReducer } = require("../lib/redux-form");
const composeReducers = require("./compose");

const login = createReducer("login");
const register = createReducer("register");

const reducer = composeReducers({
  login,
  register
});

module.exports = reducer;
