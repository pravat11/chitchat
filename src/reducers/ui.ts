import { omit } from 'lodash';

import UiState from '../domain/states/Ui';
import AppActions from '../domain/AppActions';
import { SET_DASHBOARD_STAGE } from '../actions/ui';
import DashboardStages from '../enum/DashboardStages';
import {
  SEND_MESSAGE_PENDING,
  SEND_MESSAGE_REJECTED,
  SEND_MESSAGE_FULFILLED,
  GET_MESSAGES_PENDING,
  GET_MESSAGES_REJECTED,
  GET_MESSAGES_FULFILLED
} from '../actions/messages';
import { FETCH_FRIENDS_PENDING, FETCH_FRIENDS_REJECTED, FETCH_FRIENDS_FULFILLED } from '../actions/friends';

const INITIAL_STATE: UiState = {
  currentDashboardStage: DashboardStages.FRIENDS_LIST,
  friends: {
    isFetching: false,
    error: {}
  },
  chatMessages: {
    isFetching: false,
    isSending: {},
    error: {}
  }
};

const session = (state: UiState = INITIAL_STATE, action: AppActions): UiState => {
  switch (action.type) {
    case SET_DASHBOARD_STAGE:
      return {
        ...state,
        currentDashboardStage: action.payload
      };

    case GET_MESSAGES_PENDING:
      return {
        ...state,
        chatMessages: {
          ...state.chatMessages,
          isFetching: true
        }
      };

    case GET_MESSAGES_REJECTED:
      return {
        ...state,
        chatMessages: {
          ...state.chatMessages,
          isFetching: false
        }
      };

    case GET_MESSAGES_FULFILLED:
      return {
        ...state,
        chatMessages: {
          ...state.chatMessages,
          isFetching: false
        }
      };

    case FETCH_FRIENDS_PENDING:
      return {
        ...state,
        friends: {
          ...state.friends,
          isFetching: true
        }
      };

    case FETCH_FRIENDS_REJECTED:
      return {
        ...state,
        friends: {
          ...state.friends,
          isFetching: false,
          error: getError(action.payload.response)
        }
      };

    case FETCH_FRIENDS_FULFILLED:
      return {
        ...state,
        friends: {
          ...state.friends,
          error: {},
          isFetching: false
        }
      };

    case SEND_MESSAGE_PENDING:
      return {
        ...state,
        chatMessages: {
          ...state.chatMessages,
          isSending: {
            ...state.chatMessages.isSending,
            [action.meta.timestamp]: true
          }
        }
      };

    case SEND_MESSAGE_REJECTED:
      return {
        ...state,
        chatMessages: {
          ...state.chatMessages,
          isSending: omit(state.chatMessages.isSending, action.meta.timestamp),
          error: {
            ...state.chatMessages.error,
            [action.meta.timestamp]: getError(action.payload.response)
          }
        }
      };

    case SEND_MESSAGE_FULFILLED:
      return {
        ...state,
        chatMessages: {
          ...state.chatMessages,
          isSending: {
            ...state.chatMessages.isSending,
            [action.meta.timestamp]: false
          },
          error: {}
        }
      };

    default:
      return state;
  }
};

const getError = (response: any) =>
  (response && response.data && response.data.error) || {
    message: 'Error'
  };

export default session;
