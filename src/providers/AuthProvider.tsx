"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export interface UserSessionInterface {
  name: string;
  image: string;
  email: string;
  verified: boolean;
  id: string;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
