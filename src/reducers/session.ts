import { LoginActions } from '../actions/login';
import { LOGIN_FULFILLED } from '../actions/login';
import SessionState from '../domain/states/Session';

const INITIAL_STATE: SessionState = null;

const session = (state: SessionState = INITIAL_STATE, action: LoginActions): SessionState => {
  switch (action.type) {
    case LOGIN_FULFILLED:
      return action.payload;

    default:
      return state;
  }
};

export default session;
