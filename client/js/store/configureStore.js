const { createStore, applyMiddleware, compose } = require("redux");
const reduxImmutableStateInvariant = require("redux-immutable-state-invariant").default;
const thunk = require("redux-thunk").default;

const rootReducer = require("../reducers");

function configureStore(initialState) {
  var store;
  var devtools;

  if(process.env.NODE_ENV !== "production") {

    var w = typeof window !== "undefined" ? window : undefined;
    devtools = w && w.devToolsExtension ? w.devToolsExtension() : f => f;

    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(
          thunk,
          reduxImmutableStateInvariant()
        ),
        devtools
    ));

    if(module.hot) {
      module.hot.accept("../reducers", () => {
        const nextReducer = require("../reducers");
        store.replaceReducer(nextReducer);
      });
    }

    return store;
  }

  store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
      thunk
    )
  ));

  return store;
}

module.exports = configureStore;
