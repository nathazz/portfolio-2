import { HugeiconsIcon } from '@hugeicons/react';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { SECTION_IDS, SECTIONS } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';

export function Dock() {
  const { t } = useTranslation();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <nav aria-label={t('nav.label')} className="dock">
      <ul className="dock__shelf glass">
        {SECTIONS.map(({ id, icon, color }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="dock__item"
              aria-current={activeSection === id ? 'true' : undefined}
            >
              <span className="tile" style={{ '--tile': color } as CSSProperties}>
                <HugeiconsIcon icon={icon} aria-hidden="true" />
              </span>
              {t(`nav.${id}`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
