import { ReactNode, useContext, useEffect, useState } from "react";
import {
  IAuthContext,
  IAuthState,
  TAuthResponse,
  TSignInCredentials,
  TSignUpData,
} from "./AuthContext.types";
import { AuthContext } from "./AuthContext";
import axiosInstance from "@/lib/axios";
import { initialAuthState } from "./AuthContext";
import {
  clearAuthStorage,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from "@/lib/utils/localStorage.utils";
import { isTokenExpired } from "@/lib/utils/token.utils";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<IAuthState>(initialAuthState);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getStoredToken();
        if (!token) {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
          return;
        }

        if (isTokenExpired(token)) {
          clearAuthStorage();
          setAuthState((prev) => ({ ...prev, isLoading: false }));
          return;
        }

        const user = getStoredUser();
        if (user) {
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          await refreshUser(token);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        clearAuthStorage();
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (credentials: TSignInCredentials) => {
    try {
      const response = await axiosInstance.post<TAuthResponse>(
        "/auth/signin",
        credentials
      );
      const { user, token } = response.data;

      setStoredToken(token);
      setStoredUser(user);
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (data: TSignUpData) => {
    try {
      const response = await axiosInstance.post<TAuthResponse>(
        "/auth/signup",
        data
      );
      const { user, token } = response.data;

      setStoredToken(token);
      setStoredUser(user);
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const googleSignIn = async (token: string) => {
    try {
      const response = await axiosInstance.post<TAuthResponse>("/auth/google", {
        token,
      });
      const { user, token: authToken } = response.data;

      setStoredToken(authToken);
      setStoredUser(user);
      setAuthState({
        user,
        token: authToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  const signOut = () => {
    clearAuthStorage();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const refreshUser = async (token: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      const response = await axiosInstance.get("/auth/me");
      const user = response.data;

      setStoredUser(user);
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Refresh user error:", error);
      clearAuthStorage();
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const value: IAuthContext = {
    ...authState,
    signIn,
    signUp,
    signOut,
    googleSignIn,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
