import { omit } from 'lodash';

import { LOGOUT } from '../actions/auth';
import AppActions from '../domain/AppActions';
import DataState from '../domain/states/DataState';
import {
  MESSAGE_RECEIVED,
  SEND_MESSAGE_PENDING,
  SEND_MESSAGE_REJECTED,
  SEND_MESSAGE_FULFILLED
} from '../actions/messages';
import SentMessage from '../domain/response/SentMessage';

export const INITIAL_STATE: DataState = {
  chatHistory: [],
  isSending: {},
  error: {}
};

/**
 * Reducer for data.
 *
 * @param {DataState} [state=INITIAL_STATE]
 * @param {MessageActions} action
 * @returns {DataState}
 */
export default function profile(state: DataState = INITIAL_STATE, action: AppActions): DataState {
  switch (action.type) {
    case SEND_MESSAGE_PENDING:
      //tslint:disable
      console.log(action.meta);
      return {
        ...state,
        isSending: {
          ...state.isSending,
          [action.meta.timestamp]: true
        },
        chatHistory: state.chatHistory.concat({
          ...action.meta
        })
      };

    case SEND_MESSAGE_REJECTED:
      return {
        ...state,
        isSending: omit(state.isSending, action.meta.timestamp),
        error: {
          ...state.error,
          [action.meta.timestamp]: action.payload.response
        }
      };

    case MESSAGE_RECEIVED:
      return {
        ...state,
        chatHistory: updateChatHistory(state.chatHistory, action.payload)
      };

    case SEND_MESSAGE_FULFILLED:
      return {
        ...state,
        isSending: {
          ...state.isSending,
          [action.meta.timestamp]: false
        }
      };

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}

function updateChatHistory(chatHistory: SentMessage[], payload: SentMessage): SentMessage[] {
  const { message, timestamp } = payload;
  const chatMessage = chatHistory.find(chatItem => chatItem.message === message && chatItem.timestamp === timestamp);

  return chatMessage
    ? chatHistory
    : chatHistory.concat({
        ...payload
      });
}
