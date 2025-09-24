'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Locale, switchLocale } from '@/shared/lib/i18n';

export function LanguageToggleButton({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const to = locale === 'ko' ? 'en' : 'ko';

  return (
    <button
      className="border rounded px-3 py-1 text-sm"
      onClick={() => router.replace(switchLocale(pathname || '/', to))}
      aria-label="Toggle language"
    >
      {to.toUpperCase()}
    </button>
  );
}
