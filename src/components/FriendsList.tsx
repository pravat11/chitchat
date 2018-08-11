import * as React from 'react';

import DashboardStages from '../enum/DashboardStages';

interface FriendsListProps {
  setDashboardStage: (stage: DashboardStages) => void;
}

const friends = [
  {
    friendshipId: 1,
    friendName: 'aaaa'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  },
  {
    friendshipId: 2,
    friendName: 'bbbb'
  }
];

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
    const headerElem = document.getElementById('appHeader');

    const windowHeight = window.innerHeight;
    const headerHeight = headerElem ? headerElem.offsetHeight : 0;
    const paddingOffset = 1;

    const containerHeight = windowHeight - headerHeight - paddingOffset;

    this.setState({ containerHeight });
  }

  render() {
    return (
      <div className="friend-list-container" style={{ maxHeight: this.state.containerHeight }}>
        <h2>Your friends</h2>
        <div className="friend-list">
          {friends.map(friend => (
            <div className="friend-list-item">{friend.friendName}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default FriendsList;
