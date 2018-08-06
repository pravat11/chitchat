export interface LoginResponse {
  id: number;
  token: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userAccountId: number;
}

interface Session extends LoginResponse {
  username: string;
}

type SessionState = Session | null;

export default SessionState;
