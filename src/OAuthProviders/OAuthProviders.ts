import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import signUpWithCred from "@/actions/sign-up/signUpWithCred";
import { OAuthProviderConfig, OAuthUserProfile } from "@/types/types";
import { ERROR } from "@/services/messages";
import OAuthButton from "./OAuthButton";


export type ProviderName = "github";

const OAuthProviders: OAuthProviderConfig[] = [
  {
    provider: GithubProvider({
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
          email: profile.email as string,
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
        } satisfies OAuthUserProfile;
      },
    }),
    name: "github",
    logo: "/assets/github.svg"
  },
];

export default OAuthProviders;
