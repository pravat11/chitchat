import { createAction } from 'redux-actions';

import { Action, ActionWithPayload } from './base';
import * as messageService from '../services/message';
import { SentMessage } from '../domain/response/pusherResponse';

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
export type SendMessageActionPending = Action<SEND_MESSAGE_PENDING, SentMessage>;
export type SendMessageActionRejected = ActionWithPayload<SEND_MESSAGE_REJECTED, any, SentMessage>;
export type SendMessageActionFulfilled = ActionWithPayload<SEND_MESSAGE_FULFILLED, SentMessage, SentMessage>;

export type SendMessageAction = SendMessageActionPending | SendMessageActionFulfilled | SendMessageActionRejected;
export type MessageReceivedAction = ActionWithPayload<MESSAGE_RECEIVED, SentMessage>;

export type MessageActions = SendMessageAction | MessageReceivedAction;

// Action creators
export const messageReceived: any = createAction(MESSAGE_RECEIVED);
export const sendMessage = createAction(
  SEND_MESSAGE,
  messageService.sendMessage,
  (message: string, timestamp: string) => ({
    message,
    timestamp
  })
);
