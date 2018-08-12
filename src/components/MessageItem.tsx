import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { getUsername } from '../services/user';
import AppState from '../domain/states/AppState';
import MessageStatus from '../enum/MessageStatus';
import SentMessage from '../domain/response/SentMessage';

interface MessageItemProps {
  index: number;
  username: string;
  chatMessage: SentMessage;
  previousMessage: SentMessage;
}

interface State {
  isAnimating: boolean;
}

const statusToIndicatorMap = {
  [MessageStatus.ERROR]: <div className="error-indicator" title="Sending failed" />,
  [MessageStatus.SENDING]: <div className="spinner" title="Sending" />,
  [MessageStatus.SENT]: <div className="sent-indicator" title="Sent" />
};

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

  render() {
    const { index, chatMessage, username, previousMessage } = this.props;
    const sendingFailed = chatMessage.status === MessageStatus.ERROR;
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
        {isSelf && (
          <div className={indicatorClass}>{statusToIndicatorMap[chatMessage.status || MessageStatus.ERROR]}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  username: getUsername(state.session.data)
});

export default connect(mapStateToProps)(MessageItem);
