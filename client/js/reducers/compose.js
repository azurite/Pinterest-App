const isPlainObj = function(o) {
  return typeof o === "object" && o.constructor === Object;
};

const composeReducers = function(reducers) {

  if(!isPlainObj(reducers)) {
    throw new TypeError("composeReducers() only accepts an object of reducer functions");
  }

  Object.keys(reducers).forEach((key) => {
    if(typeof reducers[key] !== "function") {
      throw new TypeError("composeReducers(): reducers." + key + "is not a function");
    }
  });

  return function(state, action) {

    if(!isPlainObj(state)) {
      throw new TypeError("composed reducer expected state to be an object and not: " + typeof state);
    }

    var keys = Object.keys(state);
    var nextState = {}, reducer;

    for(var key of keys) {
      reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
    }

    return nextState;
  };
};

module.exports = composeReducers;
