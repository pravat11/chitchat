import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { getUsername } from '../services/user';
import AppState from '../domain/states/AppState';
import { getMessages } from '../actions/messages';
import DashboardStages from '../enum/DashboardStages';
import SentMessage from '../domain/response/SentMessage';
import { setSelectedFriendshipId } from '../actions/friends';

interface MessagesContainerProps {
  username: string;
  chatHistory: SentMessage[];
  isSending: {
    [key: string]: boolean;
  };
  selectedFriendshipId: number | null;

  getMessages: (friendshipId: number) => void;
  setDashboardStage: (stage: DashboardStages) => void;
  setSelectedFriendshipId: (value: number | null) => void;
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

  async componentWillMount() {
    const { selectedFriendshipId } = this.props;

    if (selectedFriendshipId) {
      this.props.getMessages(selectedFriendshipId);
    }
  }

  async componentDidMount() {
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

  handleBackButtonClicked = () => {
    this.props.setSelectedFriendshipId(null);
    this.props.setDashboardStage(DashboardStages.FRIENDS_LIST);
  };

  render() {
    const { chatHistory, isSending, username } = this.props;

    return (
      <div className="chat-messages-container" id="chatMessagesContainer" style={{ height: this.state.height }}>
        <div
          className="header-button back-button"
          title="Back to friends list"
          onClick={this.handleBackButtonClicked}
        />
        {chatHistory.map((chatMessage, index, chatMessageArray) => {
          const sendingFailed = isSending[chatMessage.timestamp] === undefined;
          const previousMessage = index > 0 ? chatMessageArray[index - 1] : null;
          const shouldShowUsername = previousMessage ? previousMessage.username !== chatMessage.username : true;
          const isSelf = chatMessage.username === username;

          const messageBoxClass = classnames({
            'message-box': true,
            mt: shouldShowUsername,
            right: isSelf,
            left: !isSelf
          });

          const indicatorClass = classnames({
            indicator: true,
            'error-indicator-wrapper': sendingFailed
          });

          return (
            <div className={messageBoxClass} key={index}>
              {shouldShowUsername && <div className="username-wrapper">{isSelf ? 'You' : chatMessage.username}</div>}
              {chatMessage.message}
              <div className="message-time">{this.getTimeFromTimestamp(chatMessage.timestamp)}</div>
              {isSelf && <div className={indicatorClass}>{this.getIndicator(chatMessage.timestamp)}</div>}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  chatHistory: state.data.chatHistory,
  username: getUsername(state.session.data),
  isSending: state.ui.chatMessages.isSending,
  selectedFriendshipId: state.ui.selectedFriendshipId
});

const mapDispatchToProps = {
  getMessages,
  setSelectedFriendshipId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);
