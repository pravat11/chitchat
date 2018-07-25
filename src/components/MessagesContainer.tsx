import * as React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import AppState from '../domain/states/AppState';
import { ChatMessage } from '../domain/states/DataState';

interface MessagesContainerProps {
  chatHistory: ChatMessage[];
  getTimeFromTimestamp: (timestamp: string) => string;
}

interface State {
  height: number;
  setHeight: (height: number) => void;
}

const MessagesContainer = (props: MessagesContainerProps & State) => {
  //tslint:disable
  console.log(props.height);

  return (
    <div className="chat-messages-container" id="chatMessagesContainer" style={{ height: props.height }}>
      {props.chatHistory.map((chatMessage, index) => (
        <div className={`message-box ${chatMessage.self ? 'right' : 'left'}`} key={index}>
          {chatMessage.message}
          <span className="message-time">{props.getTimeFromTimestamp(chatMessage.timestamp)}</span>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  chatHistory: state.data.chatHistory
});

const enhance = compose<any, any>(
  connect(mapStateToProps),

  withState('height', 'setHeight', 0),

  withHandlers({
    getTimeFromTimestamp: (props: MessagesContainerProps) => (timestamp: string): string => {
      const date = new Date(timestamp);

      return `${date.getHours()}:${date.getMinutes()}`;
    }
  }),

  lifecycle({
    componentDidMount(this: any) {
      const headerElem = document.getElementById('appHeader');
      const formElem = document.getElementById('messageForm');

      const windowHeight = window.innerHeight;
      const headerHeight = headerElem ? headerElem.offsetHeight : 0;
      const formHeight = formElem ? formElem.offsetHeight : 0;

      const height = windowHeight - headerHeight - formHeight;

      this.props.setHeight(height);
    }
  })
);

export default enhance(MessagesContainer);
