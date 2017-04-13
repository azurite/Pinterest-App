const webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

exports.extractBundles = function({ bundles, options }) {
  const entry = {};
  const names = [];

  bundles.forEach(({ name, entries }) => {
    if(entries) {
      entry[name] = entries;
    }

    names.push(name);
  });

  function isVendor(module) {
    return module.context && module.context.indexOf("node_modules") >= 0;
  }

  return {
    entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(
        Object.assign({}, options, { names }, {
          minChunks: isVendor
        })
      )
    ]
  };
};

exports.minifyJS = function({ useSourceMap }) {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: useSourceMap,
        compress: {
          warnings: false
        }
      })
    ]
  };
};

exports.minifyCSS = function({ options }) {
  return {
    plugins: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: options
      })
    ]
  };
};

exports.setFreeVariables = function(variables) {
  const env = {};
  const keys = Object.keys(variables);

  keys.forEach((key) => {
    env[key] = JSON.stringify(variables[key]);
  });

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};
