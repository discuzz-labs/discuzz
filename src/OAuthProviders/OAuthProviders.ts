import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { OAuthProviderConfig, OAuthUserProfile } from "@/types/types";
import signUpWithOauth from "@/actions/sign-up/signUpWithOauth";
import { getEnvVar } from "@/lib/utils";

const OAuthProviders: OAuthProviderConfig[] = [
  {
    provider: GithubProvider({
      clientId: getEnvVar("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVar("GITHUB_CLIENT_SECRET"),
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
    }),
    name: "github",
    providerDisplayName: "Github",
    logo: "/assets/github.svg",
  },
];

export default OAuthProviders;
