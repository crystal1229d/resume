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

export default function AboutPage() {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations('common');
  // const tAbout = useTranslations('about');

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

      <section className="mt-8">
        <h2 className="text-base font-medium">경력</h2>
        <ul className="list-disc ml-5 text-sm mt-2">
          {/* 
            섹션 본문/요약을 다국어로 넣고 싶다면:
            1) messages/{locale}.json에 "about.summary": [...] 배열로 넣고 아래 map 사용
            2) 혹은 /content/about.{locale}.mdx로 분리해서 MDX 렌더링
          
          {tAbout.raw('summary').map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
          */}
        </ul>
      </section>
    </article>
  );
}
