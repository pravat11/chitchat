import { createAction } from 'redux-actions';

import { Action, ActionWithPayload } from './base';
import * as messageService from '../services/message';
import SentMessage from '../domain/response/SentMessage';

export const GET_MESSAGES = 'GET_MESSAGES';
export type GET_MESSAGES = typeof GET_MESSAGES;

export const GET_MESSAGES_PENDING = 'GET_MESSAGES_PENDING';
export type GET_MESSAGES_PENDING = typeof GET_MESSAGES_PENDING;

export const GET_MESSAGES_REJECTED = 'GET_MESSAGES_REJECTED';
export type GET_MESSAGES_REJECTED = typeof GET_MESSAGES_REJECTED;

export const GET_MESSAGES_FULFILLED = 'GET_MESSAGES_FULFILLED';
export type GET_MESSAGES_FULFILLED = typeof GET_MESSAGES_FULFILLED;

export const SEND_MESSAGE = 'SEND_MESSAGE';
export type SEND_MESSAGE = typeof SEND_MESSAGE;

export const SEND_MESSAGE_PENDING = 'SEND_MESSAGE_PENDING';
export type SEND_MESSAGE_PENDING = typeof SEND_MESSAGE_PENDING;

export const SEND_MESSAGE_REJECTED = 'SEND_MESSAGE_REJECTED';
export type SEND_MESSAGE_REJECTED = typeof SEND_MESSAGE_REJECTED;

export const SEND_MESSAGE_FULFILLED = 'SEND_MESSAGE_FULFILLED';
export type SEND_MESSAGE_FULFILLED = typeof SEND_MESSAGE_FULFILLED;

// Action Constants and corresponding types
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export type MESSAGE_RECEIVED = typeof MESSAGE_RECEIVED;

// Types for the actions
export type GetMessagesActionPending = Action<GET_MESSAGES_PENDING>;
export type GetMessagesActionRejected = ActionWithPayload<GET_MESSAGES_REJECTED, any>;
export type GetMessagesActionFulfilled = ActionWithPayload<GET_MESSAGES_FULFILLED, SentMessage[]>;

export type SendMessageActionPending = Action<SEND_MESSAGE_PENDING, SentMessage>;
export type SendMessageActionRejected = ActionWithPayload<SEND_MESSAGE_REJECTED, any, SentMessage>;
export type SendMessageActionFulfilled = ActionWithPayload<SEND_MESSAGE_FULFILLED, SentMessage, SentMessage>;

export type GetMessagesAction = GetMessagesActionPending | GetMessagesActionFulfilled | GetMessagesActionRejected;
export type SendMessageAction = SendMessageActionPending | SendMessageActionFulfilled | SendMessageActionRejected;
export type MessageReceivedAction = ActionWithPayload<MESSAGE_RECEIVED, SentMessage>;

export type MessageActions = GetMessagesAction | SendMessageAction | MessageReceivedAction;

// Action creators
export const messageReceived: any = createAction(MESSAGE_RECEIVED);
export const getMessages = createAction(GET_MESSAGES, messageService.getMessages);
export const sendMessage = createAction(
  SEND_MESSAGE,
  messageService.sendMessage,
  (userId, friendshipId, payload) => payload
);
