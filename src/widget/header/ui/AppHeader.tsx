'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { FiGithub, FiMail } from 'react-icons/fi';

import type { Locale } from '@/shared/lib/i18n';
import { profile } from '@/shared/config/profile';
import { HeaderShell } from '@/shared/ui/HeaderShell';
import { Nav } from '@/shared/ui/Nav/Nav';
import { IconButton, IconLink } from '@/shared/ui/IconButton/IconButton';
import { LocaleSwitch } from '@/feature/switch-locale/ui/LocaleSwitch';
import { ThemeToggle } from '@/feature/toggle-theme/ui/ThemeToggle';

import styles from './AppHeader.module.css';

const NAV_SECTIONS = [
  { id: 'profile', href: '#profile' },
  { id: 'experience', href: '#experience' },
  { id: 'competency', href: '#competency' },
  { id: 'education', href: '#education' },
  { id: 'contact', href: '#contact' },
] as const;

type Props = {
  locale: Locale;
};

export function AppHeader({ locale }: Props) {
  const t = useTranslations('nav');
  const tcm = useTranslations('common');

  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState('profile');

  const navItems = NAV_SECTIONS.map((section) => ({
    ...section,
    label: t(section.id),
  }));

  const copyTitle = copied ? tcm('actions.emailCopied') : profile.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = profile.email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  };

  useEffect(() => {
    const sections = NAV_SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );

    if (!sections.length) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { threshold: [0.3, 0.6], rootMargin: '-60px 0px -40% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <HeaderShell>
      <div className={styles.inner}>
        <div className={styles.brand} />

        <Nav items={navItems} className={styles.nav} activeId={activeId} />

        <div className={styles.actions}>
          <IconButton
            label={tcm('actions.emailCopyLabel')}
            title={copyTitle}
            onClick={handleCopyEmail}
          >
            <FiMail size={16} />
          </IconButton>
          <IconLink label="GitHub" href={profile.github} target="_blank" rel="noreferrer">
            <FiGithub size={16} />
          </IconLink>
          <LocaleSwitch locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </HeaderShell>
  );
}
