export type ReturnType<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
};
