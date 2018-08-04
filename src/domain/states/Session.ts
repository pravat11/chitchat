export interface LoginResponse {
  id: number;
  token: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userAccountId: number;
}

type SessionState = LoginResponse | null;

export default SessionState;
