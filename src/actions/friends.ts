import { createAction } from 'redux-actions';

import Friend from '../domain/response/Friend';
import { Action, ActionWithPayload } from './base';
import * as friendsService from '../services/friends';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export type FETCH_FRIENDS = typeof FETCH_FRIENDS;

export const FETCH_FRIENDS_PENDING = 'FETCH_FRIENDS_PENDING';
export type FETCH_FRIENDS_PENDING = typeof FETCH_FRIENDS_PENDING;

export const FETCH_FRIENDS_REJECTED = 'FETCH_FRIENDS_REJECTED';
export type FETCH_FRIENDS_REJECTED = typeof FETCH_FRIENDS_REJECTED;

export const FETCH_FRIENDS_FULFILLED = 'FETCH_FRIENDS_FULFILLED';
export type FETCH_FRIENDS_FULFILLED = typeof FETCH_FRIENDS_FULFILLED;

// Types for the actions
export type FetchFriendsActionPending = Action<FETCH_FRIENDS_PENDING>;
export type FetchFriendsActionRejected = ActionWithPayload<FETCH_FRIENDS_REJECTED, any>;
export type FetchFriendsActionFulfilled = ActionWithPayload<FETCH_FRIENDS_FULFILLED, Friend[]>;

export type FetchFriendsAction = FetchFriendsActionPending | FetchFriendsActionFulfilled | FetchFriendsActionRejected;

// Action creators
export const fetchFriends = createAction(FETCH_FRIENDS, friendsService.fetchFriends);
