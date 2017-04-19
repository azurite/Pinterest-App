const normalizerPlugin = function(schema, opt) {

  function listConnectedAccounts(schema, norm) {
    let curr = schema.login_method;
    let connected = [];

    opt.loginMethods.forEach((method) => {
      if(method !== curr) {
        connected.push(method);
      }
    });

    norm.connected_accounts = connected;
  }

  function normalize(schema) {
    let norm = {
      id: schema._id.toString(16),
      login_method: schema.login_method
    };

    norm.username = schema[schema.login_method].username;
    if(schema.login_method === "local") {
      norm.email = schema.local.email;
    }

    listConnectedAccounts(schema, norm);

    return norm;
  }

  schema.methods.normalize = function() {
    return normalize(this);
  };
};

module.exports = normalizerPlugin;
