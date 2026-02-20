import styles from './CoreCompetencySection.module.css';

export type CompetencyItem = {
  title: string;
  lead: string;
  bullets: string[];
  chip?: string;
  kicker?: string;
};

type Props = {
  title: string;
  items: CompetencyItem[];
};

export default function CoreCompetencySection({ title, items }: Props) {
  return (
    <section className={styles.section} id="competency">
      <h2 className={styles.h2}>{title}</h2>

      <div className={styles.list}>
        {items.map((item) => (
          <article key={item.title} className={styles.row}>
            <div className={styles.rail}>
              {item.kicker ? <span className={styles.kicker}>{item.kicker}</span> : null}
              <h3 className={styles.itemTitle}>{item.title}</h3>
            </div>

            <div className={styles.content}>
              <div className={styles.contentTop}>
                <p className={styles.lead}>{item.lead}</p>
                {item.chip ? <span className={styles.chip}>{item.chip}</span> : null}
              </div>

              <ul className={styles.bullets}>
                {item.bullets.map((b) => (
                  <li key={b} className={styles.li}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
