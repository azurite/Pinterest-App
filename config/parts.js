const dev = require("./webpack_modules/dev");
const loaders = require("./webpack_modules/loaders");
const optimize = require("./webpack_modules/optimize");
const plugins = require("./webpack_modules/plugins");
const utils = require("./webpack_modules/utils");

module.exports = {
  dev,
  loaders,
  optimize,
  plugins,
  utils
};
