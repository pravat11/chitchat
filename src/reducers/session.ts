import AppActions from '../domain/AppActions';
import SessionState from '../domain/states/Session';
import { LOGIN_FULFILLED, LOGIN_PENDING, LOGIN_REJECTED, LOGOUT } from '../actions/auth';

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
        isLoading: false,
        error: {},
        data: {
          ...action.payload,
          username: action.meta.username
        }
      };

    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case LOGIN_REJECTED:
      const errorResponse = action.payload.response;

      return {
        ...state,
        isLoading: false,
        error: (errorResponse && errorResponse.data && errorResponse.data.error) || { message: 'Error' }
      };

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default session;
