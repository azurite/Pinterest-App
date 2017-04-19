const { ajax } = require("../lib/redux-request");
const { updateUser } = require("./user");

module.exports = {
  login: function(ownProps) {
    return function(dispatch, getState) {
      ajax({
        dispatch,
        name: "login",
        url: "/auth/local/login",
        method: "post",
        body: getState().login,
        passDataToReqObj: false,
        onSuccess: function(res) {
          dispatch(updateUser(res.data));
          ownProps.history.push("/user");
        }
      });
    };
  },
  register: function(ownProps) {
    return function(dispatch, getState) {
      ajax({
        dispatch,
        name: "register",
        url: "/auth/local/register",
        method: "post",
        body: getState().register,
        passDataToReqObj: false,
        onSuccess: function(res) {
          dispatch(updateUser(res.data));
          ownProps.history.push("/user");
        }
      });
    };
  },
  logout: function(ownProps) {
    return function(dispatch) {
      ajax({
        dispatch,
        name: "logout",
        url: "auth/local/logout",
        method: "post",
        onSuccess: function() {
          dispatch(updateUser(null));
          ownProps.history.push("/");
        }
      });
    };
  }
};
