import { UiActions } from '../actions/ui';
import { AuthActions } from '../actions/auth';
import { MessageActions } from '../actions/messages';
import { FetchFriendsAction } from '../actions/friends';

type AppActions = AuthActions | MessageActions | UiActions | FetchFriendsAction;

export default AppActions;
