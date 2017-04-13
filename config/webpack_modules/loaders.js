const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.loadCSS = function({ include, exclude }) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              query: {
                modules: true,
                localIdentName: "[local]_[hash:base64:5]"
              }
            }
          ]
        }
      ]
    }
  };
};

exports.extractCSS = function({ include, exclude, use }) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: ExtractTextPlugin.extract({
            use,
            fallback: "style-loader"
          })
        }
      ],
    },
    plugins: [
      new ExtractTextPlugin("[name].[contenthash].css")
    ]
  };
};

exports.autoprefix = function() {
  return {
    loader: "postcss-loader",
    options: {
      plugins: function() {
        return [
          require("autoprefixer")
        ];
      }
    }
  };
};

exports.loadJS = function({ include, exclude }) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include,
          exclude,
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      ]
    }
  };
};

exports.loadImages = function({ include, exclude, options }) {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          include,
          exclude,
          use: {
            loader: "url-loader",
            options
          }
        }
      ]
    }
  };
};

exports.loadPug = function({ include, exclude }) {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          include,
          exclude,
          loader: "pug-loader"
        }
      ]
    }
  };
};
