const normalizerPlugin = function(schema) {

  function normalize(schema) {
    return {
      owner: schema.owner,
      id: schema._id.toString(16),
      image_url: schema.image_url,
      description: schema.description,
      liked_by: schema.liked_by
    };
  }

  schema.methods.normalize = function() {
    return normalize(this);
  };
};

module.exports = normalizerPlugin;
