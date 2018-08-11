import { createAction } from 'redux-actions';

import { ActionWithPayload } from './base';
import DashboardStages from '../enum/DashboardStages';

// Action Constants and corresponding types
export const SET_DASHBOARD_STAGE = 'SET_DASHBOARD_STAGE';
export type SET_DASHBOARD_STAGE = typeof SET_DASHBOARD_STAGE;

// Types for the actions

export type SetDashboardStageAction = ActionWithPayload<SET_DASHBOARD_STAGE, DashboardStages>;

export type UiActions = SetDashboardStageAction;

// Action creators
export const setDashboardStage = createAction(SET_DASHBOARD_STAGE);
