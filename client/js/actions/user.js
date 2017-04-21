const types = require("./types");

module.exports = {
  updateUser: function(user) {
    return {
      type: types.UPDATE_USER,
      user: user
    };
  },
  linkAccount: function(account) {
    return {
      type: types.LINK_ACCOUNT,
      account
    };
  },
  unlinkAccount: function(account) {
    return {
      type: types.UNLINK_ACCOUNT,
      account
    };
  },
  clickUnlink: function(prov) {
    return {
      type: types.CLICK_UNLINK,
      prov
    };
  },
  removePin: function(pinId) {
    return {
      type: types.REMOVE_PIN,
      pinId
    };
  },
  clickRemovePin: function(pinId) {
    return {
      type: types.CLICK_REMOVE_PIN,
      pinId
    };
  }
};
