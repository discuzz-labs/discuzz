import signInWithCred from "@/actions/sign-in/signInWithCred";
import NextAuth from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import signUpWithCred from "@/actions/sign-up/signUpWithCred";
import { ERROR } from "@/lib/messages";

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
        if (signInWithCredAction.success === true) {
          return {
            email: signInWithCredAction.data?.email,
            fullName: signInWithCredAction.data?.fullName,
            imageURL: signInWithCredAction.data?.imageURL,
            verified: signInWithCredAction.data?.verified,
          };
        } else {
          throw new Error(signInWithCredAction.error);
        }
      },
    }),
    CredentialsProvider({
      id: "signup",
      // @ts-ignore
      // see: https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials) {
        const signUpWithCredAction = await signUpWithCred({
          email: credentials?.email as string,
          password: credentials?.password as string,
          fullName: credentials?.fullName as string,
          imageURL: credentials?.imageURL as string,
        });
        if (signUpWithCredAction.success === true) {
          return {
            email: signUpWithCredAction.data?.email,
            fullName: signUpWithCredAction.data?.fullName,
            imageURL: signUpWithCredAction.data?.imageURL,
            verified: signUpWithCredAction.data?.verified,
          };
        } else {
          throw new Error(signUpWithCredAction.error);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      async profile(profile: GithubProfile)  {
        return {
          id: profile.id.toString(),
          email: profile.email,
          fullName: profile.login ?? profile.login,
          imageURL: profile.avatar_url,
          verified: true,
        };
      },
    }),
  ],
  secret: process.env.APP_KEY,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // @ts-ignore
    async signIn({ user, profile  }) {
      return true;
    },

    // @ts-ignore
    async session({ session, token }) {
      if (session?.user) {
        session.user.verified = token.verified;
        session.user.fullName = token.fullName;
        session.user.imageURL = token.imageURL;
      }
      return session;
    },
    // @ts-ignore
    async jwt({ session, trigger, token, user }) {
      if (trigger === "update" && session?.user?.verified) {
        token.verified = session.user.verified;
      }

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
