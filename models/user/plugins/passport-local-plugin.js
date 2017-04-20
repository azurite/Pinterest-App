function createError(msg, opt = {}) {
  return Object.assign(
    {
      error: true,
      message: msg
    },
    opt
  );
}

const passportLocalPlugin = function(schema, opt) {

  const uniqueFields = opt.uniqueFields || [];
  const populateFields = opt.populateFields;
  const usernameField = opt.usernameField || "username";
  const emailField = opt.emailField || "email";
  const hashField = opt.hashField || "hash";
  const saltField = opt.saltField || "salt";

  function setPasswordAndSave(user, password, cb) {
    user.setPassword(password, (err, user) => {
      user.save((err) => {
        if(err) {
          return cb(err);
        }
        cb();
      });
    });
  }

  schema.statics.authenticate = function() {
    const self = this;
    return function(username, password, cb) {
      self.findOneAndUpdate(
        { [usernameField]: username.trim() },
        { $set: { login_method: "local" } },
        { new: true }
      )
        .select("+" + hashField + " +" + saltField)
        .exec((err, user) => {
          if(err) {
            return cb(err);
          }

          if(user) {
            return user.validatePasswod(password, cb);
          }
          return cb(null, false);
        });
    };
  };

  schema.statics.register = function(user, password, cb) {
    if(!(user instanceof this)) {
      user = new this(user);
    }

    const checkForUniqueness = uniqueFields.map((field) => {
      return { [field]: user.get(field) };
    });

    if(checkForUniqueness.length) {
      const query = { $or: checkForUniqueness };

      this.findOne(query, (err, existingUser) => {
        if(err) {
          return cb(err);
        }

        if(existingUser) {
          let field;
          for(let i = 0; i < uniqueFields.length; i++) {
            field = opt.uniqueFields[i];
            if(existingUser.get(field) === user.get(field)) {
              return cb(createError("There is already a user with the same credentials."), { existingField: field });
            }
          }
        }
        setPasswordAndSave(user, password, cb);
      });
    }
    else {
      setPasswordAndSave(user, password, cb);
    }
  };

  schema.statics.linkAccount = function(currUser, newData, cb) {
    this.findOne({ _id: currUser._id })
      .select("+" + hashField + " +" + saltField)
      .exec((err, user) => {
        if(err) {
          return cb(err);
        }

        if(!user.get(hashField) && !user.get(saltField)) {
          user.set(
            usernameField,
            newData.username
          );
          user.set(
            emailField,
            newData.email
          );
          user.setPassword(newData.password, cb);
        }
        else {
          return cb(createError("You already have a local account linked to your current account"));
        }
      });
  };

  schema.statics.unlinkAccount = function(currUser, cb) {
    if(currUser.login_method !== "local") {
      this.findOneAndUpdate(
        { _id: currUser._id },
        {
          $unset: { [usernameField]: 1, [emailField]: 1, [hashField]: 1, [saltField]: 1 }
        },
        cb
      );
    }
    else {
      cb(createError("You can't unlink an account you are currently logged in with"));
    }
  };

  schema.statics.serializeUser = function() {
    return function(user, cb) {
      cb(null, user._id);
    };
  };

  schema.statics.deserializeUser = function() {
    const self = this;
    return function(_id, cb) {
      const query = self.findOne({ _id });

      if(populateFields) {
        query.populate(populateFields)
          .exec(cb);
      }
      else {
        query.exec(cb);
      }
    };
  };
};

module.exports = passportLocalPlugin;
