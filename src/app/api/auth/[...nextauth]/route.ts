import signInWithCred from "@/actions/sign-in/signInWithCred";
import NextAuth from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import signUpWithCred from "@/actions/sign-up/signUpWithCred";
import routes from "@/services/routes";
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
            name: signInWithCredAction.data?.name,
            image: signInWithCredAction.data?.image,
            verified: signInWithCredAction.data?.verified,
            id: signInWithCredAction.data?.id,
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
          name: credentials?.name as string,
          image: credentials?.image as string,
        });
        if (signUpWithCredAction.success === true) {
          return {
            email: signUpWithCredAction.data?.email,
            name: signUpWithCredAction.data?.name,
            image: signUpWithCredAction.data?.image,
            verified: signUpWithCredAction.data?.verified,
            id: signUpWithCredAction.data?.id,
          };
        } else {
          throw new Error(signUpWithCredAction.error);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      async profile(profile: GithubProfile) {
        const signUpWithCredAction = await signUpWithCred({
          email: profile.email as string,
          password: "github",
          name: profile.name ?? profile.login,
          image: profile.avatar_url,
        });

        return {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.login ?? profile.name,
          image: profile.avatar_url,
          verified: true,
          success:
            signUpWithCredAction.success === false &&
            signUpWithCredAction.error !==
              ERROR.REGISTRATION_FAILED_EMAIL_ALREADY_EXISTS,
          error:
            signUpWithCredAction.success === false &&
            signUpWithCredAction.error !==
              ERROR.REGISTRATION_FAILED_EMAIL_ALREADY_EXISTS
              ? signUpWithCredAction.error
              : null,
        };
      },
    }),
  ],
  // debug: process.env.NODE_ENV === "development",
  secret: process.env.APP_KEY,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // @ts-ignore
    async signIn({ user, profile, account }) {
      if(account.provider === "github" && profile.success === false) {
        throw new Error(profile.error)
      }
      return true;
    },

    // @ts-ignore
    async session({ session, token }) {
      if (session?.user) {
        session.user.verified = token.verified;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
    // @ts-ignore
    async jwt({ session, trigger, token, user }) {
      if (user) {
        token.verified = user.verified;
        token.name = user.name;
        token.image = user.image;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: routes.auth.signIn.path,
    signOut: routes.auth.signOut.path,
    error: routes.auth.signIn.path,
  },
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
