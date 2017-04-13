const webpack = require("webpack");
const PurifyCSSPlugin = require("purifycss-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

exports.HTMLPlugin = function({ template }) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template
      })
    ]
  };
};

exports.autoInstall = function({ dev }) {
  return {
    plugins: [
      new NpmInstallPlugin({
        dev
      })
    ]
  };
};

exports.purifyCSS = function({ paths }) {
  return {
    plugins: [
      new PurifyCSSPlugin({ paths })
    ]
  };
};

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], { root: process.cwd() })
    ]
  };
};

exports.hashedModuleIds = function() {
  return {
    plugins: [
      new webpack.HashedModuleIdsPlugin()
    ]
  };
};

exports.addStackTrace = function() {
  return {
    plugins: [
      new webpack.BannerPlugin({
        banner: "require(\"source-map-support\").install();",
        raw: true,
        entryOnly: false
      })
    ]
  };
};

exports.hmr = function() {
  return {
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};

exports.namedModules = function() {
  return {
    plugins: [
      new webpack.NamedModulesPlugin()
    ]
  };
};

exports.copy = function(patterns) {
  return {
    plugins: [
      new CopyWebpackPlugin(patterns)
    ]
  };
};
