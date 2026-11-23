import { useTranslation } from 'react-i18next';
import { HOME_TIME_ZONE } from '../../data/site';
import { useNow } from '../../hooks/useNow';
import { formatTimeInZone } from '../../lib/format';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';

/** The strip along the top of the desktop: brand on the left, settings and the clock on the right. */
export function MenuBar() {
  const { i18n } = useTranslation();
  const now = useNow();

  return (
    <header className="sticky top-0 z-50">
      <div className="glass px-fluid-xs flex items-center gap-3 border-x-0 border-t-0 py-1">
        <a href="#home" className="flex items-center gap-2">
          <span className="orb orb--leaf" aria-hidden="true" />
          <span className="font-pixel text-fluid-lg leading-none font-semibold">Nathan&apos;s</span>
        </a>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          {/* Nathan's local time, like a system clock. */}
          <time
            dateTime={now.toISOString()}
            className="text-fluid-sm font-semibold whitespace-nowrap tabular-nums"
          >
            {formatTimeInZone(now, HOME_TIME_ZONE, i18n.language)}
          </time>
        </div>
      </div>
    </header>
  );
}
