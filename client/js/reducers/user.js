const types = require("../actions/types");

const user = function(state, action) {
  switch(action.type) {
    case types.UPDATE_USER:
      return action.user;

    case types.LINK_ACCOUNT:
      return Object.assign({}, state, {
        connected_accounts: state.connected_accounts.concat([action.account])
      });

    case types.UNLINK_ACCOUNT:
      return Object.assign({}, state, {
        connected_accounts: state.connected_accounts.filter(a => a !== action.account)
      });

    case types.REMOVE_PIN:
      return Object.assign({}, state, {
        pins: state.pins.filter(pin => pin.id !== action.pinId)
      });

    case types.ADD_PIN:
      return Object.assign({}, state, {
        pins: state.pins.concat([action.pin])
      });

    default:
      return state;
  }
};

module.exports = user;
