import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import data from './data';
import AppState from '../domain/states/AppState';

/**
 * Application root reducer.
 */
const rootReducer = combineReducers<AppState>({
  data,
  form: formReducer
});

export default (state: any, action: any) => {
  return rootReducer(state, action);
};
