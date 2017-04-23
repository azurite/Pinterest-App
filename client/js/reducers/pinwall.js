const types = require("../actions/types");

const pinwall = function(state, action) {
  switch(action.type) {
    case types.LIKE_PIN:
      return Object.assign({}, state, {
        items: state.items.map((pin) => {
          if(pin.id === action.pinId) {
            return Object.assign({}, pin, { liked_by: pin.liked_by.concat([action.likerId]) });
          }
          return pin;
        })
      });

    case types.UNLIKE_PIN:
      return Object.assign({}, state, {
        items: state.items.map((pin) => {
          if(pin.id === action.pinId) {
            return Object.assign({}, pin, { liked_by: pin.liked_by.filter(id => id !== action.unlikerId) });
          }
          return pin;
        })
      });

    case types.ADD_PIN:
      return Object.assign({}, state, {
        items: [action.pin].concat(state.items)
      });

    case types.REMOVE_PIN:
      return Object.assign({}, state, {
        items: state.items.filter(pin => pin.id !== action.pinId)
      });

    case types.UPDATE_PINWALL:
      return Object.assign({}, state, {
        totalResults: action.data.totalResults,
        items: state.items.concat(action.data.items)
      });

    default:
      return state;
  }
};

module.exports = pinwall;
