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

interface State {
  showFriendsList: boolean;
}

class App extends React.Component<DashboardProps, State> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
      showFriendsList: true
    };
  }

  async componentDidMount() {
    await this.props.validateSession();

    initializePusher();
  }

  toggleFriendsListVisibilityStatus = () => {
    this.setState({ showFriendsList: !this.state.showFriendsList });
  };

  handleLogout = async () => {
    await purgeStore();
    this.props.logout();
  };

  render() {
    return (
      <div>
        <div className="cross-button" title="Logout" onClick={this.handleLogout}>
          &times;
        </div>
        {this.state.showFriendsList ? (
          <FriendsList setDashboardStage={this.props.setDashboardStage} />
        ) : (
          <React.Fragment>
            <MessagesContainer />
            <MessageForm />
          </React.Fragment>
        )}
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
