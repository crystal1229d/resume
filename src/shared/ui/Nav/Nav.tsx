'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './Nav.module.css';

type NavItem = {
  id: string;
  href: string;
  label: string;
};

type Props = {
  items: NavItem[];
  className?: string;
  activeId?: string;
};

type Indicator = { x: number; w: number; visible: boolean };

export function Nav({ items, className, activeId }: Props) {
  const navRef = useRef<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState<Indicator>({ x: 0, w: 0, visible: false });

  const navClassName = useMemo(
    () => `${styles.nav}${className ? ` ${className}` : ''}`,
    [className],
  );

  const updateIndicator = (id?: string) => {
    const nav = navRef.current;
    const targetId = id ?? activeId;
    if (!nav || !targetId) return;

    const activeEl = nav.querySelector<HTMLAnchorElement>(`a[data-nav="${targetId}"]`);
    if (!activeEl) return;

    const navRect = nav.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();

    setIndicator({
      x: aRect.left - navRect.left,
      w: aRect.width,
      visible: true,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, items.length]);

  useEffect(() => {
    const onResize = () => updateIndicator();
    window.addEventListener('resize', onResize);

    const fontReady = document.fonts?.ready;
    if (fontReady?.then) fontReady.then(() => updateIndicator());

    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav ref={navRef} className={navClassName} aria-label="Primary">
      <span
        className={styles.indicator}
        aria-hidden="true"
        style={{
          transform: `translateX(${indicator.x}px)`,
          width: `${indicator.w}px`,
          opacity: indicator.visible ? 1 : 0,
        }}
      />

      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <a
            key={item.id}
            className={`${styles.link}${isActive ? ` ${styles.active}` : ''}`}
            href={item.href}
            data-nav={item.id}
            onMouseEnter={() => updateIndicator(item.id)}
            onMouseLeave={() => updateIndicator()}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
