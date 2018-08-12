import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { getUsername } from '../services/user';
import AppState from '../domain/states/AppState';
import SentMessage from '../domain/response/SentMessage';

interface MessageItemProps {
  index: number;
  username: string;
  chatMessage: SentMessage;
  previousMessage: SentMessage;
  isSending: {
    [key: string]: boolean;
  };
}

interface State {
  isAnimating: boolean;
}

class MessageItem extends React.Component<MessageItemProps, State> {
  constructor(props: MessageItemProps) {
    super(props);

    this.state = {
      isAnimating: true
    };
  }

  componentDidMount() {
    setTimeout(this.stopAnimation, 10);
  }

  stopAnimation = () => {
    this.setState({ isAnimating: false });
  };

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
    const { index, isSending, chatMessage, username, previousMessage } = this.props;
    const sendingFailed = isSending[chatMessage.timestamp] === undefined;
    const prevMessage = index > 0 ? previousMessage : null;
    const shouldShowUsername = prevMessage ? prevMessage.username !== chatMessage.username : true;
    const isSelf = chatMessage.username === username;

    const messageBoxClass = classnames({
      'message-box': true,
      'message-box-animation': this.state.isAnimating,
      mt: shouldShowUsername,
      right: isSelf,
      left: !isSelf
    });

    const indicatorClass = classnames({
      indicator: true,
      'error-indicator-wrapper': sendingFailed
    });

    return (
      <div className={messageBoxClass} id={`chatMessage${index}`}>
        {shouldShowUsername && <div className="username-wrapper">{isSelf ? 'You' : chatMessage.username}</div>}
        {chatMessage.message}
        <div className="message-time">{this.getTimeFromTimestamp(chatMessage.timestamp)}</div>
        {isSelf && <div className={indicatorClass}>{this.getIndicator(chatMessage.timestamp)}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  username: getUsername(state.session.data),
  isSending: state.ui.chatMessages.isSending
});

export default connect(mapStateToProps)(MessageItem);
