import DashboardStages from '../../enum/DashboardStages';

interface Ui {
  currentDashboardStage: DashboardStages;
  friends: {
    isFetching: boolean;
    error: any;
  };
  chatMessages: {
    isFetching: boolean;
    isSending: {
      [key: string]: boolean;
    };
    error: {
      [key: string]: any;
    };
  };
}

export default Ui;
