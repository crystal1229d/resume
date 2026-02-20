import styles from './CertificationSection.module.css';

export type CertificationItem = {
  date: string;
  name: string;
  note?: string;
};

type Props = {
  title: string;
  items: CertificationItem[];
};

export default function CertificationSection({ title, items }: Props) {
  return (
    <section className={styles.section} id="certification">
      <h2 className={styles.h2}>{title}</h2>

      <div className={styles.grid}>
        {items.map((item) => (
          <article key={`${item.name}-${item.date}`} className={styles.card}>
            <div className={styles.date}>{item.date}</div>
            <div className={styles.name}>{item.name}</div>
            {item.note ? <div className={styles.note}>{item.note}</div> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
