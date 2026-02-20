import { FiMail, FiGithub, FiLinkedin, FiLink } from 'react-icons/fi';

import styles from './HeroSection.module.css';

type ContactItem = { label: string; url: string };

type Props = {
  id?: string;
  title: string;
  name: string;
  subtitle: string;
  contact: {
    email: string;
    items: ContactItem[];
  };
};

const getIconByLabel = (label: string) => {
  const key = label.trim().toLowerCase();

  if (key.includes('github')) return FiGithub;
  if (key.includes('linkedin')) return FiLinkedin;

  return FiLink;
};

export default function HeroSection({ id = 'profile', title, name, subtitle, contact }: Props) {
  const items = (contact.items ?? []).filter((x) => x.url && x.url.trim().length > 0);

  return (
    <header className={styles.hero} id={id}>
      <div className={styles.kicker}>{title}</div>

      <h1 className={styles.name}>{name}</h1>

      <p className={styles.sub}>{subtitle}</p>

      <div className={styles.contacts} aria-label="contact links">
        <a className={styles.contactLink} href={`mailto:${contact.email}`}>
          <FiMail size={14} />
          <span>{contact.email}</span>
        </a>

        {items.map((item) => {
          const Icon = getIconByLabel(item.label);

          return (
            <a
              key={`${item.label}-${item.url}`}
              className={styles.contactLink}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </header>
  );
}
