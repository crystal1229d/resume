'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import type { Locale } from '@/shared/lib/i18n';
import {
  getLocalizedName,
  getLocalizedTitle,
  getResumeHref,
  profile,
} from '@/shared/config/profile';

import styles from './page.module.css';

export default function AboutPage() {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations('common');
  const tAbout = useTranslations('about');

  const name = getLocalizedName(locale);
  const title = getLocalizedTitle(locale);
  const resumeHref = getResumeHref(locale);

  return (
    <article className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex items-center gap-4">
        <Image
          src="/wizard.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full"
          priority
        />
        <div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="text-sm text-neutral-600">{title}</p>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="underline underline-offset-2 hover:opacity-80"
            >
              {profile.email}
            </a>
            <span aria-hidden>·</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:opacity-80"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="mt-6">
        <a
          href={resumeHref}
          download
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-neutral-50"
        >
          {tCommon('action.downloadResume')}
        </a>
      </div>

      <section id="hero" className={styles.hero}>
        <h1 className={styles.title}>{tAbout('headline')}</h1>
        <p className={styles.subtitle}>{tAbout('sub')}</p>
        <div className={styles.ctaRow}>
          <a href="/#" className={styles.resumeBtn}>
            downloadResume
          </a>
          <a href="#" className={styles.ghostBtn}>
            seeProjects
          </a>
        </div>
      </section>

      <div className={styles.dock} role="navigation">
        <a href="#">SKILLS</a>
        <a href="#">experience</a>
        <a href="#">projects</a>
        <a href="#">blog</a>
      </div>
    </article>
  );
}
