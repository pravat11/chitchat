import * as React from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import MessageForm from './MessageForm';
import AppState from '../domain/states/AppState';
import MessagesContainer from './MessagesContainer';
import { SessionData } from '../domain/states/Session';

interface AppProps {
  validatingSession: boolean;
  sessionData: SessionData | null;
}

const App = (props: AppProps) => (
  <div className="app">
    {props.validatingSession && <div className="block-overlay" />}
    <div className="app-header" id="appHeader">
      Chitchat
    </div>
    {props.sessionData && props.sessionData.token ? (
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
  sessionData: state.session.data,
  validatingSession: state.session.validatingSession
});

export default connect(mapStateToProps)(App);
