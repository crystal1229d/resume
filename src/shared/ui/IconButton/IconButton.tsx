import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

import styles from './IconButton.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({ label, children, className, title, type, ...props }: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      aria-label={label}
      title={title ?? label}
      className={`${styles.button}${className ? ` ${className}` : ''}`}
      {...props}
    >
      <span className={styles.inner} aria-hidden="true">
        {children}
      </span>
    </button>
  );
}

export function IconLink({ label, children, className, title, ...props }: LinkProps) {
  return (
    <a
      aria-label={label}
      title={title ?? label}
      className={`${styles.button}${className ? ` ${className}` : ''}`}
      {...props}
    >
      <span className={styles.inner} aria-hidden="true">
        {children}
      </span>
    </a>
  );
}
