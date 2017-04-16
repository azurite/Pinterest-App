const T = require("prop-types");

module.exports = {
  request: T.shape({
    isPending: T.bool.isRequired,
    success: T.bool,
    error: T.object,
    data: T.oneOfType([T.object, T.array])
  }).isRequired
};
