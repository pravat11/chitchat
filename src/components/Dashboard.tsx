import * as React from 'react';
import { connect } from 'react-redux';

import { purgeStore } from '../store';
import MessageForm from './MessageForm';
import MessagesContainer from './MessagesContainer';
import { initializePusher } from '../services/pusher';
import { logout, validateSession } from '../actions/auth';

interface DashboardProps {
  logout: () => void;
  validateSession: () => void;
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
    return (
      <div>
        <div className="cross-button" title="Logout" onClick={this.handleLogout}>
          &times;
        </div>
        <MessagesContainer />
        <MessageForm />
      </div>
    );
  }
}

const mapDispatchToProps = {
  logout,
  validateSession
};

export default connect(
  null,
  mapDispatchToProps
)(App);
