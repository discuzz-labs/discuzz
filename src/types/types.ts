import { ProfileErrorType } from "@/database/Profile";
import { ProviderName } from "@/oAuth/OAuthProviders";
import { ReactElement } from "react";

export type DatabaseResponse<T> = {
  error: {
    type: ProfileErrorType,
    origin: any
  } | null;
  success: boolean;
  data: T;
};

export type ACTIONResponse<T> = {
  error: any | null;
  success: boolean;
  data: T | undefined;
};

export type OAuthUserProfile =  {
  id: string;
  email: string;
  name: string;
  image: string;
  verified: boolean;
  success: boolean;
  error: string | null;
}

export type OAuthProviderConfig = {
  provider: any;
  name: ProviderName;
  logo: string;
};
