import SessionState from '../domain/states/Session';

export const INITIAL_STATE: SessionState = {
  token: ''
};

/**
 * Reducer for session.
 *
 * @param {SessionState} [state=INITIAL_STATE]
 * @param {any} action
 * @returns {SessionState}
 */
export default function profile(state: SessionState = INITIAL_STATE, action: any): SessionState {
  switch (action.type) {
    default:
      return state;
  }
}
