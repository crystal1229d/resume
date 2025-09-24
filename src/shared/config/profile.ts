import { Locale } from '../lib/i18n/config';

type Localized<T extends string = string> = Record<'ko' | 'en', T>;

export const profile = {
  name: { ko: '이수정', en: 'Soojung Lee' },
  title: { ko: '프론트엔드 개발자', en: 'Frontend Developer' },
  email: 'leecrystal1229d@gmail.com',
  github: 'https://github.com/crystal1229d',
  resume: { en: '/assets/resume/soojung-lee_en.pdf', ko: '/assets/resume/soojung-lee_ko.pdf' },
} as const satisfies {
  name: Localized;
  title: Localized;
  email: string;
  github: string;
  resume: Localized;
};

export const l = (obj: Localized, locale: Locale) => obj[locale] ?? obj.en;
export const getLocalizedName = (locale: Locale) => l(profile.name, locale);
export const getLocalizedTitle = (locale: Locale) => l(profile.title, locale);
export const getResumeHref = (locale: Locale) => l(profile.resume, locale);
