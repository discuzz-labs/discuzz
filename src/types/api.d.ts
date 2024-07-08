export type APIResponse<T> = {
  error: any | null;
  status: 200 | 400 | 404 | 500;
  success: boolean;
  data: T | undefined;
};

export type ACTIONResponse<T> = {
  error: any | null;
  success: boolean;
  data: T | undefined;
};
