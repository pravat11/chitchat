import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const enhancers = [applyMiddleware(thunk, reduxPromiseMiddleware())];

if (window['__REDUX_DEVTOOLS_EXTENSION__']) {
  enhancers.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const config = {
  storage,
  key: 'session',
  blacklist: ['form', 'data'],
  whitelist: ['session']
};

const persistedReducer = persistReducer(config, rootReducer);

const store = createStore(persistedReducer, compose(...enhancers));

persistStore(store);

/**
 * Clears storage used by persist.
 */
export const purgeStore = () => {
  persistStore(store).purge();
};

export default store;
