import signInWithCred from "@/actions/sign-in/signInWithCred";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "login",
      // @ts-ignore
      // see: https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials, req) {
        const signInWithCredAction = await signInWithCred({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });
        if(signInWithCredAction.success === true) {
          return {
            email: signInWithCredAction.data?.email,
            fullName: signInWithCredAction.data?.fullName,
            imageURL: signInWithCredAction.data?.imageURL,
            verified: signInWithCredAction.data?.verified,
          }
        } else {
          throw new Error(signInWithCredAction.error)
        }
      },
    }),
    // CredentialsProvider({
    //   id: "signup",
    //   async authorize(credentials) {},
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.APP_KEY,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // @ts-ignore
    async signIn({ user, account, profile, email, credentials }) {
      if (user) { 
        return true;
      }
      return false;
    },

    // @ts-ignore
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.verified = token.verified;
        session.user.fullName = token.fullName;
        session.user.imageURL = token.imageURL;
      }
      return session;
    },
    // @ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.verified = user.verified;
        token.fullName = user.fullName;
        token.imageURL = user.imageURL;
      }
      return token;
    },
  },
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };