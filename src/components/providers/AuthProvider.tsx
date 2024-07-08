"use client";

import { signToken, verifyToken } from "@/services/jwt";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

export interface UserSessionInterface {
  fullName: string;
  imageURL: string;
  email: string;
  verified: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  userSession: UserSessionInterface | null;
  setUserSession: (session: UserSessionInterface) => void;
  updateUserSession: (updatedFields: Partial<UserSessionInterface>) => void;
  deleteUserSession: () => void;
}

export const UserSessionContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useUserSession = () => {
  const context = useContext(UserSessionContext);
  if (context === undefined) {
    throw new Error("useUserSession must be used within an AuthProvider");
  }
  return context;
};

const isValidSession = (session: any): session is UserSessionInterface => {
  return (
    session &&
    typeof session.fullName === "string" &&
    typeof session.imageURL === "string" &&
    typeof session.email === "string" &&
    typeof session.verified === "boolean"
  );
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userSession, setUserSessionState] =
    useState<UserSessionInterface | null>(null);

  // Load user session from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        var decodedSession = verifyToken(token);
        if (isValidSession(decodedSession)) {
          setUserSessionState(decodedSession);
        } else {
          console.error("Invalid session.");
        }
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  // Update localStorage whenever the user session changes
  const setUserSession = (session: UserSessionInterface) => {
    const token = signToken(session);
    localStorage.setItem("userToken", token);
    setUserSessionState(session);
  };

  const updateUserSession = (updatedFields: Partial<UserSessionInterface>) => {
    setUserSessionState((prevSession) => {
      if (prevSession) {
        const updatedSession = { ...prevSession, ...updatedFields };
        const token = signToken(updatedSession);
        localStorage.setItem("userToken", token);
        setUserSession(updatedSession);
        return updatedSession;
      }
      return prevSession;
    });
  };

  const deleteUserSession = () => {
    setUserSessionState(null);
    localStorage.removeItem("userToken");
  };

  return (
    <UserSessionContext.Provider
      value={{
        userSession,
        setUserSession,
        updateUserSession,
        deleteUserSession,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export default AuthProvider;
