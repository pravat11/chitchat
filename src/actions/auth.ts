import { createAction } from 'redux-actions';

import * as authService from '../services/auth';
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

export const VALIDATE_SESSION = 'VALIDATE_SESSION';
export type VALIDATE_SESSION = typeof VALIDATE_SESSION;

export const VALIDATE_SESSION_PENDING = 'VALIDATE_SESSION_PENDING';
export type VALIDATE_SESSION_PENDING = typeof VALIDATE_SESSION_PENDING;

export const VALIDATE_SESSION_REJECTED = 'VALIDATE_SESSION_REJECTED';
export type VALIDATE_SESSION_REJECTED = typeof VALIDATE_SESSION_REJECTED;

export const VALIDATE_SESSION_FULFILLED = 'VALIDATE_SESSION_FULFILLED';
export type VALIDATE_SESSION_FULFILLED = typeof VALIDATE_SESSION_FULFILLED;

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;

type LogoutAction = Action<LOGOUT>;

type LoginPendingAction = Action<LOGIN_PENDING, LoginMetadata>;
type LoginRejectedAction = ActionWithError<LOGIN_REJECTED, any, LoginMetadata>;
type LoginFulfilledAction = ActionWithPayload<LOGIN_FULFILLED, LoginResponse, LoginMetadata>;

type ValidateSessionPendingAction = Action<VALIDATE_SESSION_PENDING>;
type ValidateSessionRejectedAction = Action<VALIDATE_SESSION_REJECTED>;
type ValidateSessionFulfilledAction = Action<VALIDATE_SESSION_FULFILLED>;

type LoginActions = LoginPendingAction | LoginRejectedAction | LoginFulfilledAction;
type ValidateSessionActions =
  | ValidateSessionPendingAction
  | ValidateSessionRejectedAction
  | ValidateSessionFulfilledAction;

export type AuthActions = LoginActions | ValidateSessionActions | LogoutAction;

export const logout = createAction(LOGOUT);
export const validateSession = createAction(VALIDATE_SESSION, authService.validateSession);
export const login = createAction(LOGIN, authService.login, (formData: LoginPayload) => ({
  username: formData.username
}));
