import { LOGOUT } from '../actions/auth';
import AppActions from '../domain/AppActions';
import DataState from '../domain/states/DataState';
import SentMessage from '../domain/response/SentMessage';
import { FETCH_FRIENDS_FULFILLED } from '../actions/friends';
import { MESSAGE_RECEIVED, SEND_MESSAGE_PENDING } from '../actions/messages';

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
    case SEND_MESSAGE_PENDING:
      return {
        ...state,
        chatHistory: state.chatHistory.concat({
          ...action.meta
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
