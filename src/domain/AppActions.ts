import { UiActions } from '../actions/ui';
import { AuthActions } from '../actions/auth';
import { FriendsAction } from '../actions/friends';
import { MessageActions } from '../actions/messages';

type AppActions = AuthActions | MessageActions | UiActions | FriendsAction;

export default AppActions;
