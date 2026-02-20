import '../globals.css';

import { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Sora } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/shared/lib/i18n';
import { SUPPORTED_LOCALES } from '@/shared/lib/i18n/config';
import { createLocalizedMetadata } from '@/shared/lib/seo/meta';
import { AppHeader } from '@/widget/header/ui/AppHeader';

import styles from './layout.module.css';

const displayFont = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;

  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return createLocalizedMetadata(locale, {
    siteName: tMeta('siteName'),
    siteDescription: tMeta('siteDescription'),
    keywords: tMeta('keywords'),
  });
}


export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className={styles.body}>
        <NextIntlClientProvider messages={messages}>
          <AppHeader locale={locale} />
          <main className={styles.main}>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
