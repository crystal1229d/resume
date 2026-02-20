import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/shared/lib/i18n';
import { Link } from '@/shared/lib/i18n/navigation';

import styles from './page.module.css';

const posts = [
  {
    slug: 'first-post',
    title: 'Why MDX for a developer blog',
    date: '2026-02-10',
    summary: 'MDX lets you blend Markdown with React components for rich, reusable writing.',
  },
];

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{tNav('blog')}</h1>
        <p>Long-form writing will launch here. The structure is ready for MDX-based posts.</p>
      </header>

      <section className={styles.card}>
        <div className={styles.cardTitle}>Coming soon</div>
        <p>
          The blog is planned for deep dives on product engineering, payments, and system design.
          For now, there is one MDX sample post to show the setup.
        </p>
      </section>

      <section className={styles.list}>
        {posts.map((post) => (
          <article key={post.slug} className={styles.post}>
            <div>
              <div className={styles.postTitle}>{post.title}</div>
              <div className={styles.postSummary}>{post.summary}</div>
            </div>
            <div className={styles.postMeta}>
              <span>{post.date}</span>
              <Link className={styles.readMore} href={`/blog/${post.slug}`}>
                Read
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
