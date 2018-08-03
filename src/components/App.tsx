import * as React from 'react';
import { compose, lifecycle } from 'recompose';

import MessageForm from './MessageForm';
import MessagesContainer from './MessagesContainer';
import { initializePusher } from '../services/pusher';

const App = () => (
  <div className="app">
    <div className="app-header" id="appHeader">
      Chitchat
    </div>
    <div>
      <MessagesContainer />
      <MessageForm />
    </div>
  </div>
);

const enhance = compose<any, any>(
  lifecycle({
    componentDidMount() {
      initializePusher();
    }
  })
);

export default enhance(App);
