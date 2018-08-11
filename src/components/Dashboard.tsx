import * as React from 'react';
import { connect } from 'react-redux';

import { purgeStore } from '../store';
import MessageForm from './MessageForm';
import FriendsList from './FriendsList';
import { setDashboardStage } from '../actions/ui';
import AppState from '../domain/states/AppState';
import MessagesContainer from './MessagesContainer';
import { initializePusher } from '../services/pusher';
import DashboardStages from '../enum/DashboardStages';
import { logout, validateSession } from '../actions/auth';

interface DashboardProps {
  logout: () => void;
  validateSession: () => void;
  currentDashboardStage: DashboardStages;
  setDashboardStage: (stage: DashboardStages) => void;
}

class App extends React.Component<DashboardProps, {}> {
  async componentDidMount() {
    await this.props.validateSession();

    initializePusher();
  }

  handleLogout = async () => {
    await purgeStore();
    this.props.logout();
  };

  render() {
    const { currentDashboardStage } = this.props;

    return (
      <div>
        <div className="header-button cross-button" title="Logout" onClick={this.handleLogout}>
          &times;
        </div>
        {currentDashboardStage === DashboardStages.FRIENDS_LIST ? (
          <FriendsList setDashboardStage={this.props.setDashboardStage} />
        ) : currentDashboardStage === DashboardStages.MESSAGES_CONTAINER ? (
          <React.Fragment>
            <MessagesContainer setDashboardStage={this.props.setDashboardStage} />
            <MessageForm />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentDashboardStage: state.ui.currentDashboardStage
});

const mapDispatchToProps = {
  logout,
  validateSession,
  setDashboardStage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
