import { EAuthProvider, EUserRole } from "@/constants/enums";

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: EUserRole;
  provider: EAuthProvider;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface TAuthResponse {
  user: IUser;
  token: string;
}

export interface TSignInCredentials {
  email: string;
  password: string;
}

export interface TSignUpData {
  name: string;
  email: string;
  password: string;
}

export interface IAuthContext extends IAuthState {
  signIn: (credentials: TSignInCredentials) => Promise<void>;
  signUp: (data: TSignUpData) => Promise<void>;
  signOut: () => void;
  googleSignIn: (token: string) => Promise<void>;
  refreshUser: (token: string) => Promise<void>;
}
