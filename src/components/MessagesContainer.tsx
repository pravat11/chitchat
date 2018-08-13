import * as React from 'react';
import { connect } from 'react-redux';

import MessageItem from './MessageItem';
import AppState from '../domain/states/AppState';
import { getMessages } from '../actions/messages';
import { initializeChannel } from '../services/pusher';
import DashboardStages from '../enum/DashboardStages';
import SentMessage from '../domain/response/SentMessage';
import { setSelectedFriendshipId } from '../actions/friends';

interface MessagesContainerProps {
  chatHistory: SentMessage[];
  isFetchingChatMessages: boolean;
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
      initializeChannel(`chitchat-channel-${selectedFriendshipId}`);
      this.props.getMessages(selectedFriendshipId);
    }
  }

  componentWillReceiveProps(nextProps: MessagesContainerProps) {
    if (nextProps.chatHistory.length > this.props.chatHistory.length) {
      setTimeout(this.scrollToBottom, 10);
    }
  }

  scrollToBottom = () => {
    const numberOfMessages = this.props.chatHistory.length;
    const chatMessagesContainerElem = document.getElementById(`chatMessage${numberOfMessages - 1}`);

    if (chatMessagesContainerElem) {
      chatMessagesContainerElem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };

  async componentDidMount() {
    const headerElem = document.getElementById('appHeader');
    const formElem = document.getElementById('messageForm');

    const windowHeight = window.innerHeight;
    const headerHeight = headerElem ? headerElem.offsetHeight : 0;
    const formHeight = formElem ? formElem.offsetHeight : 0;

    const height = windowHeight - headerHeight - formHeight;

    this.setState({ height });
  }

  handleBackButtonClicked = () => {
    this.props.setSelectedFriendshipId(null);
    this.props.setDashboardStage(DashboardStages.FRIENDS_LIST);
  };

  render() {
    const { chatHistory, isFetchingChatMessages } = this.props;

    return (
      <div className="chat-messages-container" id="chatMessagesContainer" style={{ height: this.state.height }}>
        <div
          className="header-button back-button"
          title="Back to friends list"
          onClick={this.handleBackButtonClicked}
        />
        {isFetchingChatMessages ? (
          <div className="block-overlay">
            <div className="spinner message-load-spinner" />
          </div>
        ) : (
          chatHistory.map((chatMessage, index, chatMessageArray) => (
            <MessageItem
              key={`${chatMessage.status}-${index}`}
              index={index}
              chatMessage={chatMessage}
              previousMessage={chatMessageArray[index - 1]}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  chatHistory: state.data.chatHistory,
  selectedFriendshipId: state.ui.selectedFriendshipId,
  isFetchingChatMessages: state.ui.chatMessages.isFetching
});

const mapDispatchToProps = {
  getMessages,
  setSelectedFriendshipId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);
