import { ProfileErrorType } from "@/database/Profile";

export type APIResponse<T> = {
  error: any | null;
  status: 200 | 404 | 500;
  success: boolean;
  data: T;
};

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
