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
        pins: state.pins.filter(pinId => pinId !== action.pinId)
      });

    default:
      return state;
  }
};

module.exports = user;
