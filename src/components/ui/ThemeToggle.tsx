import { Moon02Icon, Sun01Icon } from '../../lib/icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="btn btn--raised btn--icon"
      aria-label={t(isDark ? 'theme.toLight' : 'theme.toDark')}
      onClick={toggleTheme}
    >
      <HugeiconsIcon icon={isDark ? Sun01Icon : Moon02Icon} className="size-5" aria-hidden="true" />
    </button>
  );
}
