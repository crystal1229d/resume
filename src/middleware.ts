import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/shared/lib/i18n';
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '@/shared/lib/i18n/config';

const intlMiddleware = createMiddleware(routing);

function pickLocale(req: NextRequest): Locale {
  // 1) 쿠키 우선 (사용자 선택)
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && (SUPPORTED_LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  // 2) 브라우저 언어
  const al = req.headers.get('accept-language') ?? '';
  const primary = al.split(',')[0]?.split('-')[0]?.toLowerCase();
  if (primary && (SUPPORTED_LOCALES as readonly string[]).includes(primary)) {
    return primary as Locale;
  }

  // 3) 폴백
  return DEFAULT_LOCALE;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // `/` → `/{locale}/about`
  if (pathname === '/') {
    const locale = pickLocale(req);
    return NextResponse.redirect(new URL(`/${locale}/about`, req.url));
  }

  // `/en` 또는 `/ko` → `/{locale}/about`
  const m = pathname.match(/^\/(en|ko)$/);
  if (m) {
    const locale = m[1] as Locale;
    return NextResponse.redirect(new URL(`/${locale}/about`, req.url));
  }

  // 나머지는 next-intl에 위임
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
