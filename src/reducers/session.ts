import AppActions from '../domain/AppActions';
import SessionState from '../domain/states/Session';
import {
  LOGOUT,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGIN_FULFILLED,
  VALIDATE_SESSION_PENDING,
  VALIDATE_SESSION_REJECTED,
  VALIDATE_SESSION_FULFILLED
} from '../actions/auth';

const INITIAL_STATE: SessionState = {
  data: null,
  isLoading: false,
  error: {},
  validatingSession: false
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

    case VALIDATE_SESSION_PENDING:
      return {
        ...state,
        validatingSession: true
      };

    case VALIDATE_SESSION_REJECTED:
    case VALIDATE_SESSION_FULFILLED:
      return {
        ...state,
        validatingSession: false
      };

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default session;
