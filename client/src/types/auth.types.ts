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

export type TSignInCredentials = {
  email: string;
  password: string;
};

export type TSignUpData = {
  email: string;
  password: string;
  name: string;
};

export type TAuthResponse = {
  user: IUser;
  token: string;
};
