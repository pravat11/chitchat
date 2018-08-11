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

export const SET_SELECTED_FRIENDSHIP_ID = 'SET_SELECTED_FRIENDSHIP_ID';
export type SET_SELECTED_FRIENDSHIP_ID = typeof SET_SELECTED_FRIENDSHIP_ID;

// Types for the actions
export type FetchFriendsActionPending = Action<FETCH_FRIENDS_PENDING>;
export type FetchFriendsActionRejected = ActionWithPayload<FETCH_FRIENDS_REJECTED, any>;
export type FetchFriendsActionFulfilled = ActionWithPayload<FETCH_FRIENDS_FULFILLED, Friend[]>;

export type SetSelectedFriendshipIdAction = ActionWithPayload<SET_SELECTED_FRIENDSHIP_ID, number>;

export type FetchFriendsAction = FetchFriendsActionPending | FetchFriendsActionFulfilled | FetchFriendsActionRejected;

export type FriendsAction = FetchFriendsAction | SetSelectedFriendshipIdAction;

// Action creators
export const setSelectedFriendshipId = createAction(SET_SELECTED_FRIENDSHIP_ID);
export const fetchFriends = createAction(FETCH_FRIENDS, friendsService.fetchFriends);
