export interface LoginResponse {
  id: number;
  token: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userAccountId: number;
}

export interface SessionData extends LoginResponse {
  username: string;
}

interface Session {
  error: any;
  isLoading: boolean;
  data: SessionData | null;
  validatingSession: boolean;
}

export default Session;
