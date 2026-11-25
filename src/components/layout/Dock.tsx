import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { SECTION_IDS, SECTIONS } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';

const TOP_THRESHOLD = 120;

export function Dock() {
  const { t } = useTranslation();
  const activeSection = useActiveSection(SECTION_IDS);
  const [atTop, setAtTop] = useState(() => window.scrollY < TOP_THRESHOLD);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < TOP_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav aria-label={t('nav.label')} className="dock" data-at-top={atTop || undefined}>
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
