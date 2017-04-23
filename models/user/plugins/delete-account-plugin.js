const mongoose = require("mongoose");

const deleteAccountPlugin = function(schema) {
  schema.statics.deleteAccount = function(id, cb) {
    this.findOneAndRemove({ _id: id }, (err, doc) => {
      if(err) {
        return cb(err);
      }
      mongoose.model("pin").remove({ _id: { $in: doc.pins } }, (err) => {
        if(err) {
          return cb(err);
        }
        cb();
      });
    });
  };
};

module.exports = deleteAccountPlugin;
