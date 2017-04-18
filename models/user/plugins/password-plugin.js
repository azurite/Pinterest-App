const crypto = require("crypto");
const scmp = require("scmp");
const semver = require("semver");

const pbkdf2DigestSupport = semver.gte(process.version, "0.12.0");

const passwordPlugin = function(schema, opt) {
  const options = {
    saltlen: opt.saltlen || 32,
    keylen: opt.keylen || 512,
    iterations: opt.iterations || 50000,
    digest: opt.digest || "sha512",
    encoding: opt.encoding || "hex"
  };

  const hashField = opt.hashField || "hash";
  const saltField = opt.saltField || "salt";

  const pbkdf2 = function(password, salt, cb) {
    if(pbkdf2DigestSupport) {
      crypto.pbkdf2(password, salt, options.iterations, options.keylen, options.digest, cb);
    }
    else {
      crypto.pbkdf2(password, salt, options.iterations, options.keylen, cb);
    }
  };

  schema.methods.setPassword = function(password, cb) {
    crypto.randomBytes(options.saltlen, (err, saltbuffer) => {
      if(err) {
        return cb(err);
      }
      const salt = saltbuffer.toString(options.encoding);

      pbkdf2(password, salt, (err, hashbuffer) => {
        if(err) {
          return cb(err);
        }

        this.set(hashField, hashbuffer.toString(options.encoding));
        this.set(saltField, salt);

        cb(null, this);
      });
    });
  };

  schema.methods.validatePasswod = function(password, cb) {
    pbkdf2(password, this.get(saltField), (err, hashbuffer) => {
      if(err) {
        return cb(err);
      }
      if(scmp(hashbuffer, new Buffer(this.get(hashField), options.encoding))) {
        return cb(null, this);
      }
      else {
        return cb(null, false);
      }
    });
  };
};

module.exports = passwordPlugin;
