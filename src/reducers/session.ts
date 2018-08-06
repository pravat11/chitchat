import AppActions from '../domain/AppActions';
import SessionState from '../domain/states/Session';
import { LOGIN_FULFILLED, LOGOUT } from '../actions/auth';

const INITIAL_STATE: SessionState = {
  data: null,
  isLoading: false,
  error: {}
};

const session = (state: SessionState = INITIAL_STATE, action: AppActions): SessionState => {
  switch (action.type) {
    case LOGIN_FULFILLED:
      return {
        ...state,
        data: {
          ...action.payload,
          username: action.meta.username
        }
      };

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default session;
