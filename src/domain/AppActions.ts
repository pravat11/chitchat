import { AuthActions } from '../actions/auth';
import { MessageActions } from '../actions/messages';

type AppActions = AuthActions | MessageActions;

export default AppActions;
