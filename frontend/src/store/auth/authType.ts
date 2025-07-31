export interface AuthUser {
  id: string;
  name: string;
  role: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: AuthUser;
}
