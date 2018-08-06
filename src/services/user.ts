import { SessionData } from '../domain/states/Session';

export function getUsername(session: SessionData | null): string {
  return session ? session.username : '';
}
