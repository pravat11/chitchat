import * as React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import AppState from '../domain/states/AppState';
import { ChatMessage } from '../domain/states/DataState';

interface MessagesContainerProps {
  chatHistory: ChatMessage[];
  getTimeFromTimestamp: (timestamp: string) => string;
}

const MessagesContainer = (props: MessagesContainerProps) => (
  <div className="chat-messages-container">
    {props.chatHistory.map((chatMessage, index) => (
      <div className={`message-box ${chatMessage.self ? 'right' : 'left'}`} key={index}>
        {chatMessage.message}
        <span className="message-time">{props.getTimeFromTimestamp(chatMessage.timestamp)}</span>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state: AppState) => ({
  chatHistory: state.data.chatHistory
});

const enhance = compose<any, any>(
  connect(mapStateToProps),

  withHandlers({
    getTimeFromTimestamp: (props: MessagesContainerProps) => (timestamp: string): string => {
      const date = new Date(timestamp);

      return `${date.getHours()}:${date.getMinutes()}`;
    }
  })
);

export default enhance(MessagesContainer);
