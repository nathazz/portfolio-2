import { Location01Icon } from '../../lib/icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslation } from 'react-i18next';
import { Window } from '../layout/Window';

export function About() {
  const { t } = useTranslation();
  const paragraphs = t('about.text').split('\n\n');

  return (
    <Window id="about" title={t('about.title')}>
      <div className="gap-fluid-s grid items-start @3xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div>
          <h3 className="text-fluid-xl font-bold">{t('about.pullQuote')}</h3>
          <div className="text-ink-soft mt-fluid-xs space-y-fluid-xs max-w-[70ch]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <aside className="inset p-fluid-xs">
          <p className="text-ink-soft flex gap-2">
            <HugeiconsIcon
              icon={Location01Icon}
              className="text-accent mt-1 size-5 flex-none"
              aria-hidden="true"
            />
            {t('about.location')}
          </p>
          <hr className="etched my-fluid-xs" />
          <p className="text-leaf flex gap-2 font-semibold">
            <span className="orb orb--leaf mx-[0.19rem] mt-1.5 self-start" aria-hidden="true" />
            {t('about.availability')}
          </p>
        </aside>
      </div>
    </Window>
  );
}
