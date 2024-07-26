import {getRequestConfig} from 'next-intl/server';
import { getCookie } from './actions/cookie';
import routes from './services/routes';

export const avilableLocales = ["English", "Deutsch", "francaise", "Espanol", "Italiano"]
export const defaultLocale = "english"

export default getRequestConfig(async () => {
  const lang = await getCookie("lang")
  const locale = lang && avilableLocales.includes(lang) ? lang.toLowerCase() : defaultLocale ;

  
  const signInPageTranslations = await import(`../lang/${locale}${routes.auth.signIn.index.translation}`);
  const signUpPageTranslations = await import(`../lang/${locale}${routes.auth.signUp.index.translation}`);
  const verifyPageTranslations = await import(`../lang/${locale}${routes.auth.verify.index.translation}`);
  const resetPasswordPageTranslations = await import(`../lang/${locale}${routes.auth.reset.password.index.translation}`);
  const resetPasswordPageTokenTranslations = await import(`../lang/${locale}${routes.auth.reset.password.token.translation}`);
  const error = await import(`../lang/${locale}/error.json`);
  const success = await import(`../lang/${locale}/success.json`);
  const pending = await import(`../lang/${locale}/pending.json`);
  const global = await import(`../lang/${locale}/global.json`);

  return {
    locale,
    messages: {
      ...signInPageTranslations,
      ...signUpPageTranslations,
      ...verifyPageTranslations,
      ...resetPasswordPageTranslations,
      ...resetPasswordPageTokenTranslations,
      ...global,
      ...error,
      ...success,
      ...pending
    },
  };
});