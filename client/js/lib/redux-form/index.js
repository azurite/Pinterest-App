let ACTION_TYPE = "UPDATE_FORM_INPUT";

const isArrayOfStrings = function(arr) {
  if(!Array.isArray(arr)) {
    return false;
  }
  for(const item of arr) {
    if(typeof item !== "string") {
      return false;
    }
  }
  return true;
};

const isString = function(str) {
  return typeof str === "string";
};

const createReducer = function(form) {
  if(!isString(form)) {
    throw new TypeError("exprected form to be a string. Instead got: " + typeof form);
  }
  return function(state, action) {
    let nextState = {};

    switch(action.type) {
      case ACTION_TYPE:

        if(action.form !== form) {
          return state;
        }
        if(Array.isArray(action.purge)) {
          for(const field of action.purge) {
            nextState[field] = "";
          }
          return Object.assign({}, state, nextState);
        }
        if(action.purge === true) {
          for(const field in state) {
            if(state.hasOwnProperty(field)) {
              nextState[field] = "";
            }
          }
          return nextState;
        }

        return Object.assign({}, state, { [action.field]: action.value });

      default:
        return state;
    }
  };
};

const updateForm = function(form, field, value, purge) {
  if(!isString(form) || (!isString(field) && !purge)) {
    throw new TypeError("form and field have to be a string.");
  }

  return {
    type: ACTION_TYPE,
    form,
    field,
    value,
    purge
  };
};

const setActionType = function(type) {
  if(!isString(type)) {
    throw new TypeError("exprected type to be string. Instead got: " + typeof type);
  }
  ACTION_TYPE = type;
};

const purgeForm = function(form, fields) {
  // returns a redux thunk
  return function(dispatch) {
    if(typeof fields === "undefined") {
      // purge all form fields
      dispatch(updateForm(form, null, null, true));
    }
    else if(typeof fields === "string") {
      // purge a single form field
      dispatch(updateForm(form, fields, ""));
    }
    else if(isArrayOfStrings(fields)) {
      // purge multiple form fields
      dispatch(updateForm(form, null, null, fields));
    }
  };
};

module.exports = {
  createReducer,
  updateForm,
  setActionType,
  purgeForm
};
