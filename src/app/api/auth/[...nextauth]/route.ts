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
      // see: https://github.com/nextauthjs/next-auth/issues/2701
      credentials: {
        email: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        try {
          const signInWithCredAction = await signInWithCred({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });
          return {
            email: signInWithCredAction.email,
            name: signInWithCredAction.name,
            image: signInWithCredAction.image,
            verified: signInWithCredAction.verified,
            id: signInWithCredAction.id,
          };
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
    CredentialsProvider({
      id: "signup",
      // @ts-ignore
      // see: https://github.com/nextauthjs/next-auth/issues/2701
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
        name: { type: "name" },
        image: { type: "file" }
      },
      async authorize(credentials) {
        try{
        const signUpWithCredAction = await signUpWithCred({
          email: credentials?.email as string,
          password: credentials?.password as string,
          name: credentials?.name as string,
          image: credentials?.image as string,
        });
        
          return {
            email: signUpWithCredAction.email,
            name: signUpWithCredAction.name,
            image: signUpWithCredAction.image,
            verified: signUpWithCredAction.verified,
            id: signUpWithCredAction.id,
          };
        }catch (err: any) {
            throw new Error(err.message);
          }
      },
    }),
    OAuthProviders.map((providerConfig) => providerConfig.provider),
  ],
  debug: process.env.NODE_ENV === "development",
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
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
