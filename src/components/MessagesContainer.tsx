import * as React from 'react';
import { connect } from 'react-redux';

import AppState from '../domain/states/AppState';
import { ChatMessage } from '../domain/states/DataState';

interface MessagesContainerProps {
  chatHistory: ChatMessage[];
  isSending: {
    [key: string]: boolean;
  };
}

interface State {
  height: number;
}

class MessagesContainer extends React.Component<MessagesContainerProps, State> {
  constructor(props: MessagesContainerProps) {
    super(props);

    this.state = {
      height: 0
    };
  }

  componentDidMount() {
    const headerElem = document.getElementById('appHeader');
    const formElem = document.getElementById('messageForm');

    const windowHeight = window.innerHeight;
    const headerHeight = headerElem ? headerElem.offsetHeight : 0;
    const formHeight = formElem ? formElem.offsetHeight : 0;

    const height = windowHeight - headerHeight - formHeight;

    this.setState({ height });
  }

  getTimeFromTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const parsedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${parsedMinutes}`;
  };

  getIndicator(timestamp: string): JSX.Element {
    const isSending = this.props.isSending[timestamp];

    if (isSending === undefined) {
      return <div className="error-indicator" title="Sending failed" />;
    }

    if (isSending) {
      return <div className="spinner" title="Sending" />;
    }

    return <div className="sent-indicator" title="Sent" />;
  }

  render() {
    const { chatHistory, isSending } = this.props;

    return (
      <div className="chat-messages-container" id="chatMessagesContainer" style={{ height: this.state.height }}>
        {chatHistory.map((chatMessage, index) => {
          const sendingFailed = isSending[chatMessage.timestamp] === undefined;

          return (
            <div className={`message-box ${chatMessage.self ? 'right' : 'left'}`} key={index}>
              {chatMessage.message}
              <div className="message-time">{this.getTimeFromTimestamp(chatMessage.timestamp)}</div>
              <div className={'indicator ' + (sendingFailed ? 'error-indicator-wrapper' : '')}>
                {this.getIndicator(chatMessage.timestamp)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isSending: state.data.isSending,
  chatHistory: state.data.chatHistory
});

export default connect(mapStateToProps)(MessagesContainer);
