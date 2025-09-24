import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from './config';

export default getRequestConfig(async ({ locale }) => {
  const normalized: Locale = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;

  return {
    locale: normalized,
    messages: (await import(`/messages/${normalized}.json`)).default,
  };
});
