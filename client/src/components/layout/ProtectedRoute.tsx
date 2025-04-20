import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../Loader";
import { useAuth } from "@/contexts/AuthContext/AuthContext.provider";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader text="Authenticating" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <>{children}</>;
};
