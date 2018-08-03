import { omit } from 'lodash';

import DataState, { ChatMessage } from '../domain/states/DataState';
import {
  MessageActions,
  MESSAGE_RECEIVED,
  SEND_MESSAGE_PENDING,
  SEND_MESSAGE_REJECTED,
  SEND_MESSAGE_FULFILLED
} from '../actions/messages';

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
export default function profile(state: DataState = INITIAL_STATE, action: MessageActions): DataState {
  switch (action.type) {
    case SEND_MESSAGE_PENDING:
      return {
        ...state,
        isSending: {
          ...state.isSending,
          [action.meta.timestamp]: true
        },
        chatHistory: state.chatHistory.concat({
          message: action.meta.message,
          timestamp: action.meta.timestamp,
          self: true
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
        chatHistory: updateChatHistory(state.chatHistory, action.payload.message, action.payload.timestamp)
      };

    case SEND_MESSAGE_FULFILLED:
      return {
        ...state,
        isSending: {
          ...state.isSending,
          [action.meta.timestamp]: false
        }
      };

    default:
      return state;
  }
}

function updateChatHistory(chatHistory: ChatMessage[], message: string, timestamp: string): ChatMessage[] {
  const chatMessage = chatHistory.find(chatItem => chatItem.message === message && chatItem.timestamp === timestamp);

  return chatMessage
    ? chatHistory
    : chatHistory.concat({
        message,
        timestamp,
        self: false
      });
}
