import { createContext } from "react";
import { IAuthState } from "@/types/auth.types";
import { IAuthContext } from "./AuthContext.types";

export const initialAuthState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
