import { UiActions } from '../actions/ui';
import { AuthActions } from '../actions/auth';
import { MessageActions } from '../actions/messages';

type AppActions = AuthActions | MessageActions | UiActions;

export default AppActions;
