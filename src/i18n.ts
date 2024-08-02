import { getRequestConfig } from 'next-intl/server';
import { getCookie } from '@/actions/cookie';
import { translationPath, availableLocales, defaultLocale } from '@/i18n.settings';

// Ensure translationFolder is relative to the project root
const translationFolder = './lang'; 

export default getRequestConfig(async () => {
  const lang = await getCookie("lang");
  const locale = lang && availableLocales.includes(lang) ? lang : defaultLocale;

  // Create an array of promises for importing translation files
  const importPromises = translationPath.map(async (path) => {
    try {
      const module = await import(`${translationFolder}/${locale}${path}`);
      return { [path.replace('.json', '').replace('/', '')]: module.default };
    } catch (error) {
      console.error(`Error importing ${locale}${path}:`, error);
      return {}; // Return empty object if import fails
    }
  });

  // Wait for all imports to complete
  const imports = await Promise.all(importPromises);

  // Merge all imported objects into one messages object
  const messages = imports.reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return {
    locale,
    messages
  };
});
