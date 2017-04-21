const T = require("prop-types");

module.exports = {
  request: T.shape({
    isPending: T.bool.isRequired,
    success: T.bool,
    error: T.object,
    data: T.oneOfType([T.object, T.array])
  }).isRequired,
  pin: T.shape({
    id: T.string.isRequired,
    owner: T.string.isRequired,
    image_url: T.string.isRequired,
    description: T.string.isRequired,
    liked_by: T.arrayOf(T.string).isRequired
  }).isRequired
};
