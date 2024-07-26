import signInWithCred from "@/actions/sign-in/signInWithCred";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import signUpWithCred from "@/actions/sign-up/signUpWithCred";
import routes from "@/services/routes";
import OAuthProviders from "@/OAuthProviders/OAuthProviders";

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
    OAuthProviders.map((providerConfig) => providerConfig.provider),
  ],
  // debug: process.env.NODE_ENV === "development",
  secret: process.env.APP_KEY,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // @ts-ignore
    async signIn({ profile, account }) {
      if (
        OAuthProviders.map((providerConfig) => providerConfig.name).includes(
          account.provider
        ) &&
        profile.success === false
      ) {
        throw new Error(profile.error);
      }
      return true;
    },

    // @ts-ignore
    async session({ session, token }) {
      if (session?.user) {
        session.user.verified = token.verified;
        session.user.id = token.id;
      }
      return session;
    },
    // @ts-ignore
    async jwt({ session, trigger, token, user }) {
      if (trigger === "update" && session?.verified) {
        token.verified = session.verified;
      }
      if (user) {
        token.verified = user.verified;
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: routes.auth.signIn.index.path,
    signOut: routes.auth.signOut.index.path,
    error: routes.auth.signIn.index.path,
  },
  debug: true,
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
