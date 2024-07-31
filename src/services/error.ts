import { ErrorCodes } from "@/types/types";

interface ErrorMessages {
  [key: string]: string;
}

let cache: ErrorMessages = {};

export const loadLangErrorsToCache = async (locale: string) : Promise<boolean> => {
  const { error } = await import(`../../lang/${locale}/error.json`);
  cache = error as ErrorMessages;
  return true
};

const error = (errorCode: ErrorCodes): string => {
  return cache[errorCode]
};

export default error;
