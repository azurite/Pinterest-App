const types = require("../actions/types");

// state is the user object in this case
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
        pins: [action.pin].concat(state.pins)
      });

    case types.LIKE_PIN:
      return Object.assign({}, state, {
        pins: state.pins.map((pin) => {
          if(pin.id === action.pinId) {
            return Object.assign({}, pin, {
              liked_by: pin.liked_by.concat([state.id])
            });
          }
          return pin;
        }),
        liked_pins: state.liked_pins.concat([action.pinId])
      });

    case types.UNLIKE_PIN:
      return Object.assign({}, state, {
        pins: state.pins.map((pin) => {
          if(pin.id === action.pinId) {
            return Object.assign({}, pin, {
              liked_by: pin.liked_by.filter(id => id !== state.id)
            });
          }
          return pin;
        }),
        liked_pins: state.liked_pins.filter(pinId => pinId !== action.pinId)
      });

    default:
      return state;
  }
};

module.exports = user;
