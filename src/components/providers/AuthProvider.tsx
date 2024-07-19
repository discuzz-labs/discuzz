"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export interface UserSessionInterface {
  fullName: string;
  imageURL: string;
  email: string;
  verified: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
