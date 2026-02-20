import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/shared/lib/i18n';
import { getLocalizedName } from '@/shared/config/profile';

import HeroSection from '@/widget/about/hero/ui/HeroSection';
import ExperienceSection from '@/widget/about/experience/ui/ExperienceSection';
import CoreCompetencySection, {
  CompetencyItem,
} from '@/widget/about/competency/ui/CoreCompetencySection';
import CertificationSection, {
  CertificationItem,
} from '@/widget/about/certification/ui/CertificationSection';
import EducationSection from '@/widget/about/education/ui/EducationSection';
import ContactSection from '@/widget/about/contact/ContactSection';

import { ExperienceItem } from '@/entity/experience/model/type';
import { ContactItem, ContactNote } from '@/entity/contact/model/type';
import styles from './page.module.css';

function resolvePdfUrl(base: string, locale: Locale) {
  return `${base}.${locale}.pdf`;
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tExperience = await getTranslations({ locale, namespace: 'experience' });
  const tCompetencies = await getTranslations({ locale, namespace: 'competencies' });
  const tCert = await getTranslations({ locale, namespace: 'certifications' });
  const tEducation = await getTranslations({ locale, namespace: 'education' });
  const tContact = await getTranslations({ locale, namespace: 'contact' });

  const name = getLocalizedName(locale);

  const experienceItems = tExperience.raw('items') as ExperienceItem[];

  const competencies = tCompetencies.raw('items') as CompetencyItem[];

  const educationItems = tEducation.raw('items') as {
    school?: string;
    name?: string;
    degree: string;
    term: string;
    notes?: string;
  }[];

  const certificationItems = tCert.raw('items') as CertificationItem[];

  const contactItems = tContact.raw('items') as ContactItem[];
  const contactNoteRaw = tContact.raw('note') as ContactNote;

  const contactNote: ContactNote = {
    ...contactNoteRaw,
    pdfUrl: resolvePdfUrl(contactNoteRaw.pdfUrl, locale),
  };

  const contactEmail =
    contactItems.find((it) => it.label.toLowerCase().includes('mail'))?.value ||
    contactItems.find((it) => it.action === 'copy')?.value ||
    '';

  const heroLinkItems = contactItems
    .filter((it) => it.action === 'external' && it.href && it.value)
    .map((it) => ({ label: it.label, url: it.href! }));

  return (
    <div className={styles.page}>
      <HeroSection
        title={tHero('title')}
        name={name}
        subtitle={tHero('subtitle')}
        contact={{
          email: contactEmail,
          items: heroLinkItems,
        }}
      />

      <ExperienceSection title={tExperience('title')} items={experienceItems} locale={locale} />

      <CoreCompetencySection title={tCompetencies('title')} items={competencies} />

      <CertificationSection title={tCert('title')} items={certificationItems} />

      <EducationSection title={tEducation('title')} items={educationItems} />

      <ContactSection title={tContact('title')} items={contactItems} note={contactNote} />
    </div>
  );
}
