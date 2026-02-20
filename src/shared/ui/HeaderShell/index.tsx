import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './HeaderShell.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

export function HeaderShell({ children, className }: Props) {
  return <header className={clsx(styles.shell, className)}>{children}</header>;
}
