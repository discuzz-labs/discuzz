import NextAuth, { User } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.APP_KEY,
  callbacks: {
    // @ts-ignore
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials)
      return true
    },
  }
};


// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
