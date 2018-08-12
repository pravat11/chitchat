import { LOGOUT } from '../actions/auth';
import AppActions from '../domain/AppActions';
import MessageStatus from '../enum/MessageStatus';
import DataState from '../domain/states/DataState';
import SentMessage from '../domain/response/SentMessage';
import { FETCH_FRIENDS_FULFILLED } from '../actions/friends';
import {
  MESSAGE_RECEIVED,
  SEND_MESSAGE_PENDING,
  SEND_MESSAGE_REJECTED,
  GET_MESSAGES_FULFILLED,
  SEND_MESSAGE_FULFILLED
} from '../actions/messages';

export const INITIAL_STATE: DataState = {
  friends: [],
  chatHistory: []
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
    case GET_MESSAGES_FULFILLED:
      return {
        ...state,
        chatHistory: action.payload
      };

    case SEND_MESSAGE_PENDING:
      return {
        ...state,
        chatHistory: state.chatHistory.concat({
          ...action.meta,
          status: MessageStatus.SENDING
        })
      };

    case SEND_MESSAGE_REJECTED:
      return {
        ...state,
        chatHistory: state.chatHistory.map(chatMessage => {
          if (chatMessage.timestamp === action.meta.timestamp) {
            chatMessage.status = MessageStatus.ERROR;
          }

          return chatMessage;
        })
      };

    case SEND_MESSAGE_FULFILLED:
      return {
        ...state,
        chatHistory: state.chatHistory.map(chatMessage => {
          if (chatMessage.timestamp === action.meta.timestamp) {
            chatMessage.status = MessageStatus.SENT;
          }

          return chatMessage;
        })
      };

    case MESSAGE_RECEIVED:
      return {
        ...state,
        chatHistory: updateChatHistory(state.chatHistory, action.payload)
      };

    case FETCH_FRIENDS_FULFILLED:
      return {
        ...state,
        friends: action.payload
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
