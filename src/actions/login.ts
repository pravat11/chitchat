import { createAction } from 'redux-actions';

import * as loginService from '../services/login';
import { LoginResponse } from '../domain/states/Session';
import { Action, ActionWithPayload, ActionWithError } from './base';

export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;

export const LOGIN_PENDING = 'LOGIN_PENDING';
export type LOGIN_PENDING = typeof LOGIN_PENDING;

export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export type LOGIN_REJECTED = typeof LOGIN_REJECTED;

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export type LOGIN_FULFILLED = typeof LOGIN_FULFILLED;

export type LoginPendingAction = Action<LOGIN_PENDING>;
export type LoginRejectedAction = ActionWithError<LOGIN_REJECTED, any>;
export type LoginFulfilledAction = ActionWithPayload<LOGIN_FULFILLED, LoginResponse>;

export type LoginActions = LoginPendingAction | LoginRejectedAction | LoginFulfilledAction;

export const login = createAction(LOGIN, loginService.login);
