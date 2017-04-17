const passportOauthPlugin = function(schema) {

  schema.statics.oauth = function(method) {
    const self = this;

    return function(token, tokenSecret, profile, cb) {
      self.findOneAndUpdate(
        {
          [method + ".id"]: profile.id
        },
        {
          $set: {
            [method + ".id"]: profile.id,
            [method + ".username"]: profile.displayName,
            [method + ".image_url"]: profile.photos[0].value.replace("_normal", "")
          }
        },
        {
          new: true,
          upsert: true
        },
        cb
      );
    };
  };
};

module.exports = passportOauthPlugin;
