const fs = require("fs");
const StatsWebpackPlugin = require("stats-webpack-plugin");

exports.nodeModules = function({ additionalModules } = { additionalModules: [] }) {
  const externals = {};
  fs.readdirSync("node_modules")
    .concat(additionalModules)
    .filter((mod) => {
      return [".bin"].indexOf(mod) === -1;
    })
    .forEach((mod) => {
      externals[mod] = "commonjs " + mod;
    });

  return {
    externals
  };
};

exports.createStats = function({ filename, exclude } = {}) {
  return {
    plugins: [
      new StatsWebpackPlugin(filename || "stats/stats.json", {
        chunkModules: true,
        exclude
      })
    ]
  };
};
