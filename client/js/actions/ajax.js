const { ajax } = require("../lib/redux-request");
const { updateUser, linkAccount, unlinkAccount } = require("./user");

const parseQuery = (q) => {
  let query = {};
  if(q.charAt(0) === "?") {
    q = q.substr(1);
  }
  q.split("&").map((s) => {
    let [key, value] = s.split("=");
    query[key] = value || "";
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
        onSuccess: function() {
          dispatch(unlinkAccount(prov));
        }
      });
    };
  }
};
