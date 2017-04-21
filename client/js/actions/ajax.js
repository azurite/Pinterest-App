const { ajax } = require("../lib/redux-request");
const { updateUser, linkAccount, unlinkAccount, removePin } = require("./user");

const parseQuery = (q) => {
  let query = {};
  if(q.charAt(0) === "?") {
    q = q.substr(1);
  }
  q.split("&").map((s) => {
    let [key, value] = s.split("=");
    value = value === "true" ? true : value === "false" ? false : value;
    query[key] = value;
  });
  return query;
};

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
      let query = parseQuery(ownProps.location.search), isLinking = false;
      if(query.linkAccount) {
        isLinking = true;
      }

      ajax({
        dispatch,
        name: "register",
        url: "/auth/local/register",
        method: "post",
        body: getState().register,
        passDataToReqObj: false,
        onSuccess: function(res) {
          if(!isLinking) {
            dispatch(updateUser(res.data));
          }
          if(isLinking) {
            dispatch(linkAccount("local"));
          }
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
  },
  unlink: function() {
    return function(dispatch, getState) {
      let prov = getState().unlinkAccount.prov;
      ajax({
        dispatch,
        name: "unlink",
        url: "/auth/" + prov + "/unlink",
        method: "delete",
        passDataToReqObj: false,
        onSuccess: function() {
          dispatch(unlinkAccount(prov));
        }
      });
    };
  },
  removePin: function() {
    return function(dispatch, getState) {
      let pinId = getState().removePin.pinId;
      ajax({
        dispatch,
        name: "remove-pin",
        url: "/api/pins/delete",
        query: { id: pinId },
        method: "delete",
        passDataToReqObj: false,
        onSuccess: function() {
          dispatch(removePin(pinId));
        }
      });
    };
  }
};
