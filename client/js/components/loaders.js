const loaders = {
  Pinwall: function() {
    return new Promise((resolve) => {
      require.ensure([], () => {
        resolve(require("./Pinwall"));
      });
    });
  },
  Login: function() {
    return new Promise((resolve) => {
      require.ensure([], () => {
        resolve(require("./Login"));
      });
    });
  },
  Register: function() {
    return new Promise((resolve) => {
      require.ensure([], () => {
        resolve(require("./Register"));
      });
    });
  },
  Profile: function() {
    return new Promise((resolve) => {
      require.ensure([], () => {
        resolve(require("./Profile"));
      });
    });
  }
};

module.exports = loaders;
