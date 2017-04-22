const normalizerPlugin = function(schema, opt) {

  function listConnectedAccounts(schema, norm) {
    let curr = schema.login_method;
    let connected = [];

    opt.loginMethods.forEach((method) => {
      if(method !== curr) {
        switch(method) {
          case "local":
            if(schema.get("local.email")) {
              connected.push(method);
            }
            break;

          default:
            if(schema.get(method + ".id")) {
              connected.push(method);
            }
        }
      }
    });

    norm.connected_accounts = connected;
  }

  function normalize(schema) {
    let norm = {
      id: schema._id.toString(16),
      login_method: schema.login_method,
      pins: schema.pins.map(pin => pin.normalize()),
      liked_pins: schema.liked_pins
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
