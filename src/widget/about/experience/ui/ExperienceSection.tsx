import clsx from 'clsx';

import type { ExperienceItem } from '@/entity/experience/model/type';
import { getIsCurrent, getYearLabel, sortExperience } from '@/entity/experience/model/sort';
import { formatTerm } from '@/entity/experience/model/term';

import styles from './ExperienceSection.module.css';

type Props = {
  title: string;
  items: ExperienceItem[];
  locale: 'ko' | 'en';
};

export default function ExperienceSection({ title, items, locale }: Props) {
  const sorted = sortExperience(items);

  return (
    <section className={styles.section} id="experience">
      <h2 className={styles.h2}>{title}</h2>

      <div className={styles.timeline}>
        {sorted.map((item) => {
          const year = getYearLabel(item.term);
          const formattedTerm = formatTerm(item.term, locale);
          const current = getIsCurrent(item.term);

          return (
            <article key={`${item.company}-${item.term}`} className={styles.row}>
              <div className={styles.left}>
                <div className={styles.year}>{year}</div>
                <div className={styles.term}>{formattedTerm}</div>
              </div>

              <div className={styles.mid} aria-hidden="true">
                <span className={clsx(styles.dot, current && styles.dotCurrent)} />
                <span className={styles.line} />
              </div>

              <div className={styles.right}>
                <div className={styles.head}>
                  <div className={styles.companyBlock}>
                    <h3 className={styles.company}>{item.company}</h3>
                    <div className={styles.location}>{item.location}</div>
                  </div>

                  <div className={styles.meta}>
                    <span className={styles.role}>{item.role}</span>
                  </div>
                </div>

                <p className={styles.desc}>{item.description}</p>

                {item.responsibilities?.length ? (
                  <ul className={styles.list}>
                    {item.responsibilities.map((line) => (
                      <li key={line} className={styles.li}>
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.projects?.length ? (
                  <div className={styles.projects}>
                    <div className={styles.projectsTitle}>
                      {locale === 'ko' ? '프로젝트' : 'Projects'}
                    </div>

                    <ul className={styles.projectList}>
                      {item.projects.map((p) => (
                        <li key={p.name} className={styles.projectItem}>
                          <div className={styles.projectHead}>
                            <span className={styles.projectName}>{p.name}</span>
                            {p.tech?.length ? (
                              <span className={styles.projectTech}>
                                {p.tech.join(' · ')}
                              </span>
                            ) : null}
                          </div>

                          {p.summary ? (
                            <div className={styles.projectSummary}>{p.summary}</div>
                          ) : null}

                          {p.contributions?.length ? (
                            <ul className={styles.list}>
                              {p.contributions.map((line) => (
                                <li key={line} className={styles.li}>
                                  {line}
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          {p.results?.length ? (
                            <div className={styles.results}>
                              <div className={styles.resultsTitle}>
                                {locale === 'ko' ? '성과' : 'Results'}
                              </div>
                              <ul className={styles.list}>
                                {p.results.map((line) => (
                                  <li key={line} className={styles.li}>
                                    {line}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
