'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useNav } from './useNav';

import styles from './nav.module.css';

export default function NavBar() {
  const { expanded, hidden, setExpanded } = useNav();
  const t = useTranslations('nav');

  return (
    <header
      className={[
        styles.nav,
        expanded ? styles.expanded : styles.collapsed,
        hidden ? styles.hidden : '',
      ].join(' ')}
      aria-hidden={hidden ? 'true' : 'false'}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label={t('home')}>
          SJ
        </Link>

        <nav aria-label={t('primary')}>
          <ul className={styles.links}>
            <li>
              <Link href="/projects">{t('projects')}</Link>
            </li>
            <li>
              <Link href="/blog">{t('blog')}</Link>
            </li>
            <li>
              <Link href="/about">{t('about')}</Link>
            </li>
            <li>
              <Link href="/resume">{t('resume')}</Link>
            </li>
          </ul>
        </nav>

        <button
          className={styles.menuBtn}
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? t('close') : t('menu')}
        </button>
      </div>
    </header>
  );
}
