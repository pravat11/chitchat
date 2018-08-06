import { createAction } from 'redux-actions';

import * as loginService from '../services/login';
import LoginPayload from '../domain/misc/LoginPayload';
import { LoginResponse } from '../domain/states/Session';
import { Action, ActionWithPayload, ActionWithError } from './base';

interface LoginMetadata {
  username: string;
}

export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;

export const LOGIN_PENDING = 'LOGIN_PENDING';
export type LOGIN_PENDING = typeof LOGIN_PENDING;

export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export type LOGIN_REJECTED = typeof LOGIN_REJECTED;

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export type LOGIN_FULFILLED = typeof LOGIN_FULFILLED;

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;

export type LogoutAction = Action<LOGOUT>;

export type LoginPendingAction = Action<LOGIN_PENDING, LoginMetadata>;
export type LoginRejectedAction = ActionWithError<LOGIN_REJECTED, any, LoginMetadata>;
export type LoginFulfilledAction = ActionWithPayload<LOGIN_FULFILLED, LoginResponse, LoginMetadata>;

export type LoginActions = LoginPendingAction | LoginRejectedAction | LoginFulfilledAction;

export type AuthActions = LoginActions | LogoutAction;

export const logout = createAction(LOGOUT);
export const login = createAction(LOGIN, loginService.login, (formData: LoginPayload) => ({
  username: formData.username
}));
