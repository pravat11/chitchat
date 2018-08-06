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
  data: SessionData | null;
  isLoading: boolean;
  error: any;
}

export default Session;
