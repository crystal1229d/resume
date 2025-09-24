import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from './config';

export function hasLocale(locales: readonly string[], locale: string): locale is Locale {
  return locales.includes(locale);
}

function ensureLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

function normalizeSlashes(path: string): string {
  // 다중 슬래시를 한 개로 정리 (e.g., //ko///about -> /ko/about)
  return path.replace(/\/{2,}/g, '/');
}

/**
 * pathname 앞의 로케일 세그먼트를 제거합니다. (예: "/ko/about" -> "/about")
 */
export function stripLocalePrefix(pathname: string): string {
  const path = ensureLeadingSlash(pathname);
  const pattern = new RegExp(`^/(?:${SUPPORTED_LOCALES.join('|')})(?=/|$)`);
  return path.replace(pattern, '') || '/';
}

/**
 * pathname에서 현재 로케일을 추출합니다. 없으면 null.
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, first] = ensureLeadingSlash(pathname).split('/');
  return hasLocale(SUPPORTED_LOCALES, first) ? (first as Locale) : null;
}

/**
 * 로케일을 전환한 새 pathname을 반환합니다.
 * - 기존에 로케일 세그먼트가 있으면 교체, 없으면 추가
 * - 옵션으로 기본 로케일을 숨기거나(trailing slash도 제어) 할 수 있음
 */
export function switchLocale(
  pathname: string,
  nextLocale: Locale,
  opts: { hideDefaultLocale?: boolean; keepTrailingSlash?: boolean } = {},
): string {
  const { hideDefaultLocale = false, keepTrailingSlash = false } = opts;

  // 1) 선행 슬래시 보장 및 중복 슬래시 정리
  const path = normalizeSlashes(ensureLeadingSlash(pathname));

  // 2) 기존 로케일 세그먼트 제거
  let rest = stripLocalePrefix(path);

  // 3) 트레일링 슬래시 처리
  if (!keepTrailingSlash && rest.length > 1 && rest.endsWith('/')) {
    rest = rest.replace(/\/+$/, '');
  }

  // 4) 기본 로케일 숨기기 옵션
  if (hideDefaultLocale && nextLocale === DEFAULT_LOCALE) {
    return rest === '' ? '/' : rest;
  }

  // 5) 새 로케일 프리픽스 붙이기
  if (rest === '' || rest === '/') return `/${nextLocale}`;
  return `/${nextLocale}${rest}`;
}
