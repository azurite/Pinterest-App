const types = require("./types");

module.exports = {
  incrPage: function() {
    return {
      type: types.INCR_PAGE
    };
  },
  updatePinwall: function(data) {
    return {
      type: types.UPDATE_PINWALL,
      data
    };
  }
};
