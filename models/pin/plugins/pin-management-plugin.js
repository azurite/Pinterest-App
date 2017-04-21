const mongoose = require("mongoose");

const pinManagementPlugin = function(schema) {

  schema.statics.uploadPin = function(pin, ownerId, cb) {
    if(!(pin instanceof this)) {
      pin = new this(pin);
    }

    pin.save((err) => {
      if(err) {
        return cb(err);
      }
      mongoose.model("user").findOneAndUpdate(
        { _id: ownerId },
        {
          $push: { pins: pin }
        },
        cb
      );
    });
  };

  schema.statics.deletePin = function(pinId, ownerId, cb) {
    this.findOneAndRemove(
      {
        owner: ownerId,
        _id: pinId
      },
      (err) => {
        if(err) {
          return cb(err);
        }
        mongoose.model("user").findOneAndUpdate(
          { _id: ownerId },
          {
            $pull: { pins: pinId }
          },
          (err) => {
            if(err) {
              return cb(err);
            }
            mongoose.model("user").update(
              { liked_pins: pinId },
              {
                $pull: { liked_pins: pinId }
              },
              cb
            );
          }
        );
      }
    );
  };

  schema.statics.likePin = function(pinId, likerId, cb) {
    this.findOneAndUpdate(
      { _id: pinId },
      {
        $addToSet: { liked_by: likerId }
      },
      (err) => {
        if(err) {
          return cb(err);
        }
        mongoose.model("user").findOneAndUpdate(
          { _id: likerId },
          {
            $addToSet: { liked_pins: pinId }
          },
          cb
        );
      }
    );
  };

  schema.statics.unlikePin = function(pinId, unlikerId, cb) {
    this.findOneAndUpdate(
      { _id: pinId },
      {
        $pull: { liked_by: unlikerId }
      },
      (err) => {
        if(err) {
          return cb(err);
        }
        mongoose.model("user").findOneAndUpdate(
          { _id: unlikerId },
          {
            $pull: { liked_pins: pinId }
          },
          cb
        );
      }
    );
  };
};

module.exports = pinManagementPlugin;
