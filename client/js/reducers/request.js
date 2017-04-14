const createRequestReducer = function(actionType) {
  return function(state, action) {
    switch(action.type) {
      case actionType:
        switch(action.cmd) {
          case "begin":
            return {
              isPending: true,
              success: null,
              error: null,
              data: state.data
            };

          case "done":
            return {
              isPending: false,
              success: true,
              error: null,
              data: action.data
            };

          case "fail":
            return {
              isPending: false,
              success: false,
              error: action.error,
              data: state.data
            };

          case "clear-error":
            return Object.assign({}, state, {
              error: null
            });

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

      default:
        return state;
    }
  };
};

module.exports = createRequestReducer;
