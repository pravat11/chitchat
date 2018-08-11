import * as React from 'react';

import { connect } from 'react-redux';
import { getUserId } from '../services/user';
import Friend from '../domain/response/Friend';
import AppState from '../domain/states/AppState';
import { fetchFriends } from '../actions/friends';
import DashboardStages from '../enum/DashboardStages';

interface FriendsListProps {
  userId: number;
  friends: Friend[];
  fetchFriends: (userId: number) => void;
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

  handleListItemClicked = () => {
    this.props.setDashboardStage(DashboardStages.MESSAGES_CONTAINER);
  };

  render() {
    return (
      <div className="friend-list-container" style={{ maxHeight: this.state.containerHeight }}>
        <h2>Your friends</h2>
        <div className="friend-list">
          {this.props.friends.map(friend => (
            <div className="friend-list-item" onClick={this.handleListItemClicked}>
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
  fetchFriends
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);
