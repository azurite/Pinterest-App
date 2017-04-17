const passportLocalPlugin = function(schema, opt) {

  const populateFields = opt.populateFields;
  const usernameField = opt.usernameField;
  const hashField = opt.hashField;
  const saltField = opt.saltField;

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
      self.findOne({ [usernameField]: username })
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

    const checkForUniqueness = opt.uniqueFields.map((field) => {
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
          for(let i = 0; i < opt.uniqueFields.length; i++) {
            field = opt.uniqueFields[i];
            if(existingUser.get(field) === user.get(field)) {
              return cb(); // this field is already taken
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

  schema.statics.serializeUser = function() {
    return function(user, cb) {
      cb(null, user._id);
    };
  };

  schema.statics.deserializeUser = function() {
    return function(_id, cb) {
      const query = this.findOne({ _id });

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
