'use client';

import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

import { getStoredTheme, toggleTheme, type Theme, applyTheme } from '@/shared/lib/theme';
import { IconButton } from '@/shared/ui/IconButton/IconButton';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = getStoredTheme() ?? 'system';
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const handleClick = () => {
    const next = toggleTheme();
    setTheme(next);
  };

  const isDark = theme === 'dark';

  return (
    <IconButton label="Toggle theme" title={theme} onClick={handleClick}>
      {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </IconButton>
  );
}
