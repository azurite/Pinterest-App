const paginationPlugin = function(schema) {

  schema.statics.paginate = function(query, cb) {
    let { search = {}, offset = 0, chunkSize = 10 } = query;

    offset = parseInt(offset, 10);
    chunkSize = parseInt(chunkSize, 10);

    this.count({}, (err, count) => {
      if(err) {
        return cb(err);
      }

      this.find(search).skip(offset * chunkSize).limit(chunkSize).exec((err, docs) => {
        if(err) {
          return cb(err);
        }

        const result = {
          totalResults: count,
          items: docs
        };

        cb(null, result);
      });
    });
  };
};

module.exports = paginationPlugin;
