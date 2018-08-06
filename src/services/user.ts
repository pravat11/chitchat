import SessionState from '../domain/states/Session';

export function getUsername(session: SessionState): string {
  return session ? session.username : '';
}
