import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { Locale, routing } from '@/shared/lib/i18n';
import { createLocalizedMetadata } from '@/shared/lib/seo/meta';

import { Header } from '@/widget/header';
import NavBar from '@/widget/nav';

// 빌드 시 정적으로 뽑을 locale 경로 지정
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 정적 강제 (Optional) - 빌드 시 모든 locale에 대해 정적 HTML 생성
export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return createLocalizedMetadata(locale);
}
interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale); // 설정 locale로 고정 -> 정적 캐시/SSG
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* <Header locale={locale} /> */}
          <NavBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
