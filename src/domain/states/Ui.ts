import DashboardStages from '../../enum/DashboardStages';

interface Ui {
  selectedFriendshipId: number | null;
  currentDashboardStage: DashboardStages;
  friends: {
    isFetching: boolean;
    error: any;
  };
  chatMessages: {
    isFetching: boolean;
    error: {
      [key: string]: any;
    };
  };
}

export default Ui;
