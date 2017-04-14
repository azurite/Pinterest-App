const initialState = require("./initialState");

module.exports = function getInitialState() {
  let state = window.__PRELOADED_STATE__;

  if(typeof state === "string") {
    return JSON.parse(state);
  }
  if(typeof state === "object") {
    return state;
  }
  if(typeof state === "undefined") {
    return initialState;
  }
};
