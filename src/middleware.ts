import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/shared/lib/i18n';
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '@/shared/lib/i18n/config';

const intlMiddleware = createMiddleware(routing);

function pickLocale(req: NextRequest): Locale {
  // 1) Cookie preference
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && (SUPPORTED_LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  // 2) Browser language
  const al = req.headers.get('accept-language') ?? '';
  const primary = al.split(',')[0]?.split('-')[0]?.toLowerCase();
  if (primary && (SUPPORTED_LOCALES as readonly string[]).includes(primary)) {
    return primary as Locale;
  }

  // 3) Fallback
  return DEFAULT_LOCALE;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // `/` -> `/{locale}`
  if (pathname === '/') {
    const locale = pickLocale(req);
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // Delegate the rest to next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
