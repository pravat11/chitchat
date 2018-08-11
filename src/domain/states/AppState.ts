import UiState from './Ui';
import DataState from './DataState';
import SessionState from './Session';

interface AppState {
  form: any;
  ui: UiState;
  data: DataState;
  session: SessionState;
}

export default AppState;
