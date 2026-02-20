'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Locale, switchLocale } from '@/shared/lib/i18n';
import { IconButton } from '@/shared/ui/IconButton/IconButton';

type Props = {
  locale: Locale;
};

export function LocaleSwitch({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === 'ko' ? 'en' : 'ko';

  return (
    <IconButton
      label="Switch language"
      title={locale.toUpperCase()}
      onClick={() => router.replace(switchLocale(pathname || '/', nextLocale))}
    >
      <span style={{ fontSize: 12, fontWeight: 700 }}>{locale.toUpperCase()}</span>
    </IconButton>
  );
}
