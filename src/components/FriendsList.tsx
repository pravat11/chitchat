import * as React from 'react';

import { connect } from 'react-redux';
import { getUserId } from '../services/user';
import Friend from '../domain/response/Friend';
import AppState from '../domain/states/AppState';
import DashboardStages from '../enum/DashboardStages';
import { fetchFriends, setSelectedFriendshipId } from '../actions/friends';

interface FriendsListProps {
  userId: number;
  friends: Friend[];
  isFetchingFriendList: boolean;
  fetchFriends: (userId: number) => void;
  setSelectedFriendshipId: (id: number) => void;
  setDashboardStage: (stage: DashboardStages) => void;
}

interface State {
  containerHeight: number;
}

class FriendsList extends React.Component<FriendsListProps, State> {
  constructor(props: FriendsListProps) {
    super(props);

    this.state = {
      containerHeight: 0
    };
  }

  componentDidMount() {
    const { userId } = this.props;

    this.props.fetchFriends(userId);

    const headerElem = document.getElementById('appHeader');

    const windowHeight = window.innerHeight;
    const headerHeight = headerElem ? headerElem.offsetHeight : 0;
    const paddingOffset = 1;

    const containerHeight = windowHeight - headerHeight - paddingOffset;

    this.setState({ containerHeight });
  }

  handleListItemClicked = (friendshipId: number) => {
    this.props.setSelectedFriendshipId(friendshipId);
    this.props.setDashboardStage(DashboardStages.MESSAGES_CONTAINER);
  };

  render() {
    const { friends, isFetchingFriendList } = this.props;

    return (
      <div className="friend-list-container" style={{ maxHeight: this.state.containerHeight }}>
        <div className="friend-title-wrapper">
          {isFetchingFriendList ? (
            <div className="message-load-spinner with-text">
              <span>Retrieving friend list</span>
              <div className="spinner center" />
            </div>
          ) : (
            <span className="friend-title">Your friends</span>
          )}
        </div>
        {!isFetchingFriendList && (
          <div className="friend-list">
            {!friends.length && <div className="friend-list-item empty-list">Your friend list is currently empty.</div>}
            {friends.map(friend => (
              <div
                key={friend.friendshipId}
                className="friend-list-item"
                onClick={() => this.handleListItemClicked(friend.friendshipId)}
              >
                {friend.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  friends: state.data.friends,
  userId: getUserId(state.session.data),
  isFetchingFriendList: state.ui.friends.isFetching
});

const mapDispatchToProps = {
  fetchFriends,
  setSelectedFriendshipId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);
