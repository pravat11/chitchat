import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as formReducer } from 'redux-form';

import ui from './ui';
import data from './data';
import session from './session';
import AppState from '../domain/states/AppState';

const config = {
  storage,
  key: 'data',
  whitelist: ['data']
};

const persistedSessionReducer = persistReducer(config, session);

/**
 * Application root reducer.
 */
const rootReducer = combineReducers<AppState>({
  ui,
  data,
  form: formReducer,
  session: persistedSessionReducer
});

export default (state: any, action: any) => {
  return rootReducer(state, action);
};
