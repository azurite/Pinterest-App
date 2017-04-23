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
  },
  addPin: function(pin) {
    return {
      type: types.ADD_PIN,
      pin
    };
  },
  likePin: function(pinId, likerId) {
    return {
      type: types.LIKE_PIN,
      pinId,
      likerId
    };
  },
  unlikePin: function(pinId, unlikerId) {
    return {
      type: types.UNLIKE_PIN,
      pinId,
      unlikerId
    };
  }
};
