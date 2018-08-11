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
    return (
      <div className="friend-list-container" style={{ maxHeight: this.state.containerHeight }}>
        <h2>Your friends</h2>
        <div className="friend-list">
          {this.props.friends.map(friend => (
            <div
              key={friend.friendshipId}
              className="friend-list-item"
              onClick={() => this.handleListItemClicked(friend.friendshipId)}
            >
              {friend.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  friends: state.data.friends,
  userId: getUserId(state.session.data)
});

const mapDispatchToProps = {
  fetchFriends,
  setSelectedFriendshipId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);
