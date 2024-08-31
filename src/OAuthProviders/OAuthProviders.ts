import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { OAuthProviderConfig, OAuthUserProfile } from "@/types/types";
import signUpWithOauth from "@/actions/sign-up/signUpWithOauth";
import { env } from "@/env";

const OAuthProviders: OAuthProviderConfig[] = [
  {
    provider: GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      name: "github",
      async profile(profile: GithubProfile) {
        try {
          const signUpWithOauthAction = await signUpWithOauth({
            email: profile.email as string,
            name: profile.name ?? profile.login,
            image: profile.avatar_url,
          });

          return {
            id: profile.id.toString(),
            email: profile.email as string,
            name: profile.login ?? profile.name,
            image: profile.avatar_url,
            verified: true,
            success: true,
            error: null,
          } satisfies OAuthUserProfile;
        } catch (error) {
          return {
            id: "",
            email: "",
            name: "",
            image: "",
            verified: false,
            success: false,
            error: null,
          } satisfies OAuthUserProfile;
        }
      },
    })
  },
];

export default OAuthProviders;
