import DashboardStages from '../../enum/DashboardStages';

interface Ui {
  currentDashboardStage: DashboardStages;
  friends: {
    isFetching: boolean;
    error: any;
  };
  chatMessages: {
    isSending: {
      [key: string]: boolean;
    };
    error: {
      [key: string]: any;
    };
  };
}

export default Ui;
