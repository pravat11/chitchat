import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const enhancers = [applyMiddleware(thunk, reduxPromiseMiddleware())];

if (window['__REDUX_DEVTOOLS_EXTENSION__']) {
  enhancers.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const store = createStore(rootReducer, compose(...enhancers));

persistStore(store);

/**
 * Clears storage used by persist.
 */
export const purgeStore = () => {
  persistStore(store).purge();
};

export default store;
