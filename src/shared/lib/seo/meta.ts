import type { Metadata } from 'next';
import type { Locale } from '@/shared/lib/i18n';
import { profile, getLocalizedName, getLocalizedTitle } from '@/shared/config/profile';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://temp.com';

const ogLocaleMap: Record<Locale, { self: string; alternates: string[] }> = {
  ko: { self: 'ko_KR', alternates: ['en_AU'] },
  en: { self: 'en_AU', alternates: ['ko_KR'] },
};

export function createLocalizedMetadata(locale: Locale): Metadata {
  const localizedName = getLocalizedName(locale);
  const localizedTitle = getLocalizedTitle(locale);
  const titleText = `${localizedName} | ${localizedTitle}`;
  const og = ogLocaleMap[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: titleText,
    description: titleText,
    openGraph: {
      title: `${localizedName} — ${localizedTitle}`,
      type: 'website',
      siteName: titleText,
      url: `/${locale}`,
      locale: og.self,
      alternateLocale: og.alternates,
      images: [{ url: '/og.png' }],
    },
    authors: [{ name: localizedName, url: profile.github }],
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', ko: '/ko' },
    },
    icons: {
      icon: [{ url: '/wizard.png', sizes: '32x32', type: 'image/png' }],
    },
  };
}

export function createPageMetadata(locale: Locale, overrides: Partial<Metadata> = {}): Metadata {
  return { ...createLocalizedMetadata(locale), ...overrides };
}
