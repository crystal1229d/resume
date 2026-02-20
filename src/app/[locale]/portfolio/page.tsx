import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/shared/lib/i18n';

import styles from './page.module.css';

type Project = {
  name: string;
  role: string;
  term: string;
  summary: string;
  highlights?: string[];
  results?: string[];
  tech?: string[];
  team?: {
    size: number;
    breakdown?: { pm?: number; web?: number; server?: number };
    note?: string;
  };
  ownership?: string;
  metrics?: {
    title: string;
    badges: { label: string; value: string }[];
    note?: string;
  };
};

export default async function PortfolioPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const tProjects = await getTranslations({ locale, namespace: 'projects' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const projectKeys = [
    'emorderPlatform',
    'lgAiSquare',
    'kiaSpecialVehiclesRenewal',
    'surveyDashboard',
    'smartFridge',
  ] as const;
  const projects = projectKeys.map((key) => tProjects.raw(key) as Project);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{tProjects('title')}</h1>
        <p>Product-focused delivery across payments, enterprise platforms, and analytics.</p>
      </header>

      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2>{project.name}</h2>
                <span>{project.summary}</span>
              </div>
              <div className={styles.cardMeta}>
                <span>{project.term}</span>
                <span>{tCommon('role')}: {project.role}</span>
              </div>
            </div>

            {project.metrics && (
              <div className={styles.metrics}>
                <div className={styles.metricsTitle}>{project.metrics.title}</div>
                <div className={styles.metricBadges}>
                  {project.metrics.badges.map((badge) => (
                    <span key={badge.label} className={styles.metricBadge}>
                      {badge.label}: {badge.value}
                    </span>
                  ))}
                </div>
                {project.metrics.note && <div className={styles.metricNote}>{project.metrics.note}</div>}
              </div>
            )}

            {project.highlights && (
              <div className={styles.block}>
                <div className={styles.blockTitle}>{tCommon('highlights')}</div>
                <ul>
                  {project.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.results && (
              <div className={styles.block}>
                <div className={styles.blockTitle}>{tCommon('results')}</div>
                <ul>
                  {project.results.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.tech && (
              <div className={styles.tech}>
                <div className={styles.blockTitle}>{tCommon('techStack')}</div>
                <div className={styles.techList}>
                  {project.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            )}

            {project.team && (
              <div className={styles.team}>
                <div className={styles.blockTitle}>{tCommon('team')}</div>
                <div>
                  {tCommon('team')}: {project.team.size}
                </div>
                {project.team.note && <div className={styles.teamNote}>{project.team.note}</div>}
              </div>
            )}

            {project.ownership && <div className={styles.ownership}>{project.ownership}</div>}
          </article>
        ))}
      </div>
    </div>
  );
}
