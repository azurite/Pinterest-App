let ACTION_TYPE = "REQUEST";

const isType = function(target, type) {
  return typeof target === type;
};

const isString = function(str) {
  return isType(str, "string");
};

const isFunction = function(fn) {
  return isType(fn, "function");
};

const isObject = function(obj) {
  return isType(obj, "object");
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

const namedPaginators = {};

const concat = function({ olddata, newdata, name }) {
  if(name && isFunction(namedPaginators[name])) {
    return namedPaginators[name](olddata, newdata);
  }
  return paginator ? paginator(olddata, newdata) : default_concat(olddata, newdata);
};

const setPaginator = function() {
  if(!isString(arguments[0]) && isFunction(arguments[1])) {
    let name = arguments[0], fn = arguments[1];
    namedPaginators[name] = fn;
  }
  else if(isFunction(arguments[0])) {
    paginator = arguments[0];
  }
  else {
    throw new TypeError("setPaginator() recieved invalid input: " + arguments[0] + ", " + arguments[1]);
  }
};

const updateRequestState = function(state, action, requestName) {
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
        data: action.options.paginate ? concat({
          olddata: state.data,
          newdata: action.data,
          name: requestName
        }) : action.data
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
        return updateRequestState(state, action, requestName);

      default:
        return state;
    }
  };
};

const createAction = function(requestName, cmd, error, data, options = {}) {
  return {
    type: ACTION_TYPE,
    requestName,
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

const axios = require("axios");

const serializeQuery = (q) => "?" + Object.keys(q).map(key => key + "=" + q[key]).join("&");

const ajax = function({ dispatch, url, method, name, body, query, onSuccess, passDataToReqObj = true, options }) {
  let fullUrl;
  if(["get", "post", "put", "delete"].indexOf(method) === - 1) {
    throw new TypeError("ajax method is invalid: " + method);
  }
  if(!isString(name)) {
    throw new TypeError("ajax did not recieve a request name");
  }
  if(!isFunction(onSuccess)) {
    throw new TypeError("onSuccess is not a function");
  }
  if(query) {
    fullUrl = url + serializeQuery(query);
  }
  else {
    fullUrl = url;
  }
  dispatch(begin(name));
  axios[method](fullUrl, body)
    .then((res) => {
      if(res.data.error) {
        // these errors can happen due to wrong user input f.ex but technically everything went fine
        dispatch(fail(name, res.data));
        return;
      }

      if(passDataToReqObj) {
        dispatch(done(name, res.data, options));
        onSuccess(res);
        return;
      }
      else {
        dispatch(done(name));
        onSuccess(res);
        return;
      }
    })
    .catch((err) => {
      let displayError = {};
      if(err.response) {
        if(isString(err.response.data)) {
          displayError.message = err.response.data;
        }
        else if(isObject(err.response.data) && isString(err.response.data.message)) {
          displayError.message = err.response.data.message;
        }
        dispatch(fail(name, displayError));
      }
      else if(err.request) {
        dispatch(fail(name, { message: "whops something went wrong. Please reload the page try again" }));
      }
      else {
        dispatch(fail(name, { message: err.message || "Unknown error occured" }));

        if(process.env.NODE_ENV !== "production") {
          console.error("Error caught by promise:\n");
          console.error(err);
        }
      }
    });
};

module.exports = {
  createRequest,
  createReducer,
  setActionType,
  setPaginator,
  init,
  begin,
  done,
  fail,
  ajax
};
