export type APIResponse = {
  message: string;
  error?: any;
  status: 200 | 400 | 404 | 500;
  success: boolean;
};
