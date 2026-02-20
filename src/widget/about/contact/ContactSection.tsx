'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FiCopy, FiExternalLink, FiDownload, FiCheck } from 'react-icons/fi';

import type { ContactItem, ContactNote } from '@/entity/contact/model/type';
import styles from './ContactSection.module.css';

type Props = {
  title: string;
  items: ContactItem[];
  note?: ContactNote;
};

const isNonEmpty = (s?: string) => !!s && s.trim().length > 0;

export default function ContactSection({ title, items, note }: Props) {
  const tCommon = useTranslations('common');

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [checkKey, setCheckKey] = useState<string | null>(null);

  useEffect(() => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  if (activeKey) {
    timeout = setTimeout(() => {
      setActiveKey(null);
    }, 900);
  }

  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
}, [activeKey]);

useEffect(() => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  if (checkKey) {
    timeout = setTimeout(() => {
      setCheckKey(null);
    }, 300);
  }

  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
}, [checkKey]);


  const normalizedItems = useMemo(
    () =>
      items.filter(
        (it) =>
          isNonEmpty(it.value) &&
          (it.action !== 'external' || (isNonEmpty(it.href) && isNonEmpty(it.value)))
      ),
    [items]
  );

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCheckKey(key);
      setActiveKey(key);
    } catch {
      // silently fail
    }
  };

  return (
    <section className={styles.section} id="contact">
      <h2 className={styles.h2}>{title}</h2>

      <div className={styles.panel}>
        <dl className={styles.list}>
          {normalizedItems.map((it) => {
            const key = `${it.label}-${it.value}-${it.action}`;
            const isActive = activeKey === key;
            const showCheck = checkKey === key;

            return (
              <div key={key} className={styles.row}>
                <dt className={styles.dt}>{it.label}</dt>

                <dd className={styles.dd}>
                  <div className={styles.valueWrap}>
                    {it.action === 'external' ? (
                      <a
                        className={styles.link}
                        href={it.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setActiveKey(key)}
                      >
                        {it.value}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className={`${styles.link} ${styles.copyValue}`}
                        onClick={() => handleCopy(it.value, key)}
                        aria-label={tCommon('actions.copy')}
                        title={tCommon('actions.copy')}
                      >
                        {it.value}
                      </button>
                    )}

                    {it.action === 'copy' ? (
                      <button
                        type="button"
                        className={styles.actionIcon}
                        onClick={() => handleCopy(it.value, key)}
                        aria-label={tCommon('actions.copy')}
                        title={tCommon('actions.copy')}
                        data-active={isActive ? 'true' : 'false'}
                      >
                        {showCheck ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                      </button>
                    ) : (
                      <span
                        className={styles.actionIcon}
                        aria-hidden="true"
                        data-active={isActive ? 'true' : 'false'}
                        title={tCommon('actions.openInNewTab')}
                      >
                        <FiExternalLink />
                      </span>
                    )}
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>

        {note ? (
          <p className={styles.note}>
            <span>{note.prefix}</span>
            <a className={styles.noteCta} href={note.pdfUrl} download>
              <span className={styles.noteCtaText}>{note.cta}</span>
              <span className={styles.noteDoor} aria-hidden="true">
                <span className={styles.noteDoorIcon}>
                  <FiDownload />
                </span>
              </span>
            </a>
            {' '}
            <span className={styles.noteSuffix}>{note.suffix}</span>
          </p>
        ) : null}
      </div>
    </section>
  );
}
