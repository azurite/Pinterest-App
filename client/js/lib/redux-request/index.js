let ACTION_TYPE = "REQUEST";

const isString = function(str) {
  return typeof str === "string";
};

const createRequest = function() {
  return {
    isPending: false,
    success: null,
    error: null,
    data: null
  };
};

/*
 * If pagination is set to true this function will concat the old data from the revious request with the new data form the new request
 * The user can provide a custom function via setPaginator(). Otherwise the following default is used.
 *
 * if both olddata and newdata are arrays, they are simply concatinated
 * if they are both objects the function will iterate over each property and if both props are an array it will concatinate those
 * otherwise the old stuff is kept and the new stuff is simply added
 */
const default_concat = function(olddata, newdata) {
  if(Array.isArray(olddata) && Array.isArray(newdata)) {
    return olddata.concat(newdata);
  }

  for(const p in olddata) {
    if(olddata.hasOwnProperty(p)) {
      // if both datasets have the same property
      if(newdata.hasOwnProperty(p)) {
        newdata[p] = default_concat(olddata[p], newdata[p]);
      }
      else {
        // if the new dataset doesn't have that property, simply keep the data of the old one
        newdata[p] = olddata[p];
      }
    }
  }
  return newdata;
};

let paginator;

const concat = function(olddata, newdata) {
  return paginator ? paginator(olddata, newdata) : default_concat(olddata, newdata);
};

const setPaginator = function(fn) {
  if(typeof fn !== "function") {
    throw new TypeError("expected fn to be a function. Instead got: " + typeof fn);
  }
  paginator = fn;
};

const updateRequestState = function(state, action) {
  switch(action.cmd) {
    case "init":
      return {
        isPending: false,
        success: null,
        error: null,
        data: null
      };

    case "begin":
      return {
        isPending: true,
        sucess: null,
        error: null,
        data: state.data
      };

    case "done":
      return {
        isPending: false,
        success: true,
        error: null,
        data: action.options.paginate ? concat(state.data, action.data) : action.data
      };

    case "fail":
      return {
        isPending: false,
        sucess: false,
        error: action.error,
        data: state.data
      };

    default:
      if(process.env.NODE_ENV !== "production") {
        console.warn(
          "Warning! Unknown request type recieved: '" + action.cmd + "'.\n" +
          "Returning default state. \n" +
          "Maybe you misspelled a string?"
        );
      }
      return state;
  }
};

const createReducer = function(requestName) {
  return function(state, action) {
    switch(action.type) {
      case ACTION_TYPE:
        if(action.requestName !== requestName) {
          return state;
        }
        return updateRequestState(state, action);

      default:
        return state;
    }
  };
};

const createAction = function(requestName, cmd, error, data, options = {}) {
  return {
    type: ACTION_TYPE,
    cmd,
    error,
    data,
    options
  };
};

const init = function(requestName) {
  return createAction(requestName, "init");
};

const begin = function(requestName) {
  return createAction(requestName, "begin");
};

const done = function(requestName, data, options) {
  return createAction(requestName, "done", null, data, options);
};

const fail = function(requestName, error) {
  return createAction(requestName, "fail", error);
};

const setActionType = function(type) {
  if(!isString(type)) {
    throw new TypeError("exprected type to be string. Instead got: " + typeof type);
  }
  ACTION_TYPE = type;
};

module.exports = {
  createRequest,
  createReducer,
  setActionType,
  setPaginator,
  init,
  begin,
  done,
  fail
};
