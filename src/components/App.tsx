import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import Login from './Login';
import MessageForm from './MessageForm';
import AppState from '../domain/states/AppState';
import MessagesContainer from './MessagesContainer';
import SessionState from '../domain/states/Session';
import { initializePusher } from '../services/pusher';

interface AppProps {
  session: SessionState;
}

const App = (props: AppProps) => (
  <div className="app">
    <div className="app-header" id="appHeader">
      Chitchat
    </div>
    {props.session && props.session.token ? (
      <div>
        <MessagesContainer />
        <MessageForm />
      </div>
    ) : (
      <Login />
    )}
  </div>
);

const mapStateToProps = (state: AppState) => ({
  session: state.session
});

const enhance = compose<any, any>(
  connect(mapStateToProps),

  lifecycle({
    componentDidMount() {
      initializePusher();
    }
  })
);

export default enhance(App);
