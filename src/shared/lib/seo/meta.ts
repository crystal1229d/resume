import type { Metadata } from 'next';
import type { Locale } from '@/shared/lib/i18n';
import { profile, getLocalizedName, getLocalizedTitle } from '@/shared/config/profile';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

const ogLocaleMap: Record<Locale, { self: string; alternates: string[] }> = {
  ko: { self: 'ko_KR', alternates: ['en_AU'] },
  en: { self: 'en_AU', alternates: ['ko_KR'] },
};

export function createLocalizedMetadata(
  locale: Locale,
  meta: { siteName: string; siteDescription: string; keywords: string }
): Metadata {
  const localizedName = getLocalizedName(locale);
  const localizedTitle = getLocalizedTitle(locale);
  const titleText = meta.siteName || `${localizedName} | ${localizedTitle}`;
  const og = ogLocaleMap[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: titleText,
    description: meta.siteDescription,
    keywords: meta.keywords,
    openGraph: {
      title: titleText,
      description: meta.siteDescription,
      type: 'website',
      siteName: meta.siteName,
      url: `/${locale}`,
      locale: og.self,
      alternateLocale: og.alternates,
      images: [{ url: '/og.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: meta.siteDescription,
      images: ['/og.png'],
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

export function createPageMetadata(
  locale: Locale,
  meta: { siteName: string; siteDescription: string; keywords: string },
  overrides: Partial<Metadata> = {}
): Metadata {
  return { ...createLocalizedMetadata(locale, meta), ...overrides };
}
