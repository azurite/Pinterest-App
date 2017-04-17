const passportOauthPlugin = function(schema) {

  function update(method, profile) {
    return {
      $set: {
        [method + ".id"]: profile.id,
        [method + ".username"]: profile.displayName,
        [method + ".image_url"]: profile.photos[0].value.replace("_normal", ""),
        login_method: method
      }
    };
  }

  schema.statics.oauth = function(method, opt) {
    const self = this;

    return function(req, token, tokenSecret, profile, cb) {
      // link social account if provider is different from current login_method
      if(req.isAuthenticated() && opt.allowAccountLinking) {
        if(req.user.login_method === method) {
          cb(null, req.user);
        }
        else {
          self.findOneAndUpdate(
            {
              _id: req.user._id
            },
            update(req.user.login_method, profile),
            err => cb(err, req.user)
          );
        }
      }
      else {
        self.findOneAndUpdate(
          {
            [method + ".id"]: profile.id
          },
          update(method, profile),
          {
            new: true,
            upsert: true
          },
          cb
        );
      }
    };
  };
};

module.exports = passportOauthPlugin;
