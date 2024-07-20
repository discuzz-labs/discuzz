import NextAuth from "next-auth";
import { UserSessionInterface } from '../components/providers/AuthProvider';

declare module "next-auth" {
  interface Session {
    user: UserSessionInterface
  }
}