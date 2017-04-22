const types = require("./types");

module.exports = {
  incrPage: function() {
    return {
      type: types.INCR_PAGE
    };
  }
};
