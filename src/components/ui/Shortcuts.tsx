import { HugeiconsIcon } from '@hugeicons/react';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { SHORTCUTS } from '../../data/site';

export function Shortcuts({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation();

  return (
    <ul className={className}>
      {SHORTCUTS.map(({ id, label, icon, color, href }) => (
        <li key={id}>
          <a
            href={href(i18n.language)}
            target="_blank"
            rel="noopener noreferrer"
            className="shortcut"
          >
            <span className="tile" style={{ '--tile': color } as CSSProperties}>
              <HugeiconsIcon icon={icon} aria-hidden="true" />
            </span>
            <span className="shortcut__label">{label ?? t('hero.resume')}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
