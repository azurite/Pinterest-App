const webpack = require("webpack");

exports.devServer = function({ host, port, proxy }) {
  return {
    devServer: {
      historyApiFallback: true,
      hotOnly: true,
      stats: "errors-only",
      host,
      port,
      proxy
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  };
};

exports.sourceMap = function({ type }) {
  return {
    devtool: type
  };
};
