import UiState from '../domain/states/Ui';
import AppActions from '../domain/AppActions';
import { SET_DASHBOARD_STAGE } from '../actions/ui';
import DashboardStages from '../enum/DashboardStages';

const INITIAL_STATE: UiState = {
  currentDashboardStage: DashboardStages.FRIENDS_LIST
};

const session = (state: UiState = INITIAL_STATE, action: AppActions): UiState => {
  switch (action.type) {
    case SET_DASHBOARD_STAGE: {
      return {
        ...state,
        currentDashboardStage: action.payload
      };
    }

    default:
      return state;
  }
};

export default session;
