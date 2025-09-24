'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Locale, stripLocalePrefix } from '@/shared/lib/i18n';
import { routes } from '@/shared/config/route';
import { profile } from '@/shared/config/profile';

import { LanguageToggleButton } from '@/feature/language-toggle/LanguageToggleButton';

import styles from './Header.module.css';

type NavItem = {
  key: string;
  href: string;
};

const NAV: NavItem[] = [
  { key: 'common.nav.about', href: routes.about },
  { key: 'common.nav.skills', href: routes.skills },
  { key: 'common.nav.projects', href: routes.projects },
  { key: 'common.nav.experience', href: routes.experience },
  { key: 'common.nav.blog', href: routes.blog },
  { key: 'common.nav.contact', href: routes.contact },
];

function withLocalePrefix(locale: Locale, path: string) {
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

type Props = {
  locale: Locale;
};

export function Header({ locale }: Props) {
  const t = useTranslations();
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname() || '/';
  const pathnameWithoutLocale = stripLocalePrefix(pathname);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={withLocalePrefix(locale, '/')} className={styles.logo}>
          <span className={styles.logoMark}>•</span>
          <span className={styles.logoText}>Portfolio</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => {
            const href = withLocalePrefix(locale, item.href);
            const isActive =
              (item.href === '/' && pathnameWithoutLocale === '/') ||
              (item.href !== '/' && pathnameWithoutLocale.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <LanguageToggleButton locale={locale} />
          <a
            className={styles.cta}
            href={profile.resume[currentLocale]}
            download
            aria-label={t('common.action.downloadResume')}
          >
            {t('common.action.downloadResume')}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
