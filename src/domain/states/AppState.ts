import DataState from './DataState';
import SessionState from './Session';

interface AppState {
  form: any;
  data: DataState;
  session: SessionState;
}

export default AppState;
