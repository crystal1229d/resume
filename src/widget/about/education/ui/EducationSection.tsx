import { EducationItem } from '@/entity/education/model/type';

import styles from './EducationSection.module.css';

type Props = {
  title: string;
  items: EducationItem[];
};

export default function EducationSection({ title, items }: Props) {
  return (
    <section className={styles.section} id="education">
      <h2 className={styles.h2}>{title}</h2>

      <div className={styles.timeline}>
        {items.map((item) => {
          const schoolName = item.school ?? item.name ?? '';
          return (
            <article key={`${schoolName}-${item.degree}-${item.term}`} className={styles.row}>
              <div className={styles.left}>
                <div className={styles.term}>{item.term}</div>
              </div>

              <div className={styles.mid} aria-hidden="true">
                <span className={styles.dot} />
                <span className={styles.line} />
              </div>

              <div className={styles.right}>
                <div className={styles.head}>
                  <div className={styles.schoolBlock}>
                    <h3 className={styles.school}>{schoolName}</h3>

                    <div className={styles.location}>{item.location}</div>

                    <div className={styles.degree}>{item.degree}</div>

                    <div className={styles.termLine}>
                      {item.term}
                      {item.graduation && ` · ${item.graduation}`}
                    </div>
                  </div>

                  {item.notes ? <div className={styles.notes}>{item.notes}</div> : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
