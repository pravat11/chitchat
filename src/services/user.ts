import { SessionData } from '../domain/states/Session';

export function getUsername(session: SessionData | null): string {
  return session ? session.username : '';
}

export function getUserId(session: SessionData | null): number {
  return session ? session.userAccountId : 0;
}
