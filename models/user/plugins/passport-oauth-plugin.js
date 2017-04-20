const debug = require("debug")("pinterest-app");

function createError(msg, opt = {}) {
  return Object.assign(
    {
      error: true,
      message: msg
    },
    opt
  );
}

const passportOauthPlugin = function(schema) {

  function update(method, curr_method, profile) {
    return {
      $set: {
        [method + ".id"]: profile.id,
        [method + ".username"]: profile.displayName,
        [method + ".image_url"]: profile.photos[0].value.replace("_normal", ""),
        login_method: curr_method
      }
    };
  }

  schema.statics.oauth = function(method, opt) {
    const self = this;

    return function(req, token, tokenSecret, profile, cb) {
      if(req.isAuthenticated() && opt.allowAccountLinking) {
        if(req.user.login_method === method) {
          cb(null, req.user);
        }
        else {

          debug("linking profile: %O", profile);
          
          self.findOneAndUpdate(
            {
              _id: req.user._id
            },
            update(method, req.user.login_method, profile),
            err => cb(err, req.user)
          );
        }
      }
      else {
        self.findOneAndUpdate(
          {
            [method + ".id"]: profile.id
          },
          update(method, req.user.login_method, profile),
          {
            new: true,
            upsert: true
          },
          cb
        );
      }
    };
  };

  schema.statics.unlinkOauth = function(currUser, method, cb) {
    if(currUser.login_method !== method) {
      this.fineOneAndUpdate(
        { _id: currUser._id },
        {
          $unset: { [method + ".id"]: "", [method + ".username"]: "" }
        },
        cb
      );
    }
    else {
      cb(createError("You can't unlink an account you are currently logged in with"));
    }
  };
};

module.exports = passportOauthPlugin;
