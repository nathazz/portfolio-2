import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENT_JOB } from '../../data/experience';
import { GITHUB_USERNAME } from '../../data/site';
import { LANGUAGES } from '../../i18n';
import { Window } from '../layout/Window';
import { Shortcuts } from '../ui/Shortcuts';
import localPhoto from '/assets/icon/profile.png';

// The GitHub avatar stays in sync with the profile; the bundled photo covers
// the case where GitHub is unreachable.
const GITHUB_AVATAR = `https://github.com/${GITHUB_USERNAME}.png?size=480`;

/**
 * The first screen: the desktop with its shortcuts down the side and the
 * welcome window, which introduces Nathan with a photo and the key facts.
 */
export function Hero() {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState(GITHUB_AVATAR);

  return (
    <div className="page-width pt-fluid-m @container">
      <div className="gap-fluid-s grid items-start @3xl:grid-cols-[auto_minmax(0,1fr)]">
        <Window
          id="home"
          level={1}
          title={`Nathan — ${t('hero.titleLead')} ${t('hero.titleStrong')}`}
          className="@3xl:order-last"
          status={
            <>
              <span className="orb orb--leaf" aria-hidden="true" />
              {t('about.availability')}
            </>
          }
        >
          <div className="gap-fluid-s grid items-center @2xl:grid-cols-[minmax(9rem,15rem)_minmax(0,1fr)]">
            <div className="photo-frame aspect-square max-w-[15rem]">
              <img
                src={photo}
                alt="Nathan"
                width={480}
                height={480}
                className="size-full object-cover"
                onError={() => setPhoto(localPhoto)}
              />
            </div>

            <div>
              <p className="text-fluid-4xl font-extrabold tracking-tight">
                <span className="block">{t('hero.titleLead')}</span>
                <span className="text-accent block">{t('hero.titleStrong')}</span>
              </p>

              <p className="text-fluid-lg text-ink-soft mt-fluid-xs max-w-[46ch]">
                {t('hero.subtitle')}
              </p>

              <dl className="facts border-rule mt-fluid-s pt-fluid-xs border-t">
                <div>
                  <dt>{t('hero.card.location')}</dt>
                  <dd>{t('hero.card.place')}</dd>
                </div>
                <div>
                  <dt>{t('hero.card.languages')}</dt>
                  <dd>{LANGUAGES.map(({ code }) => code.toUpperCase()).join(' · ')}</dd>
                </div>
                {CURRENT_JOB && (
                  <div>
                    <dt>{t('hero.card.now')}</dt>
                    <dd>
                      <a
                        href={`#job-${CURRENT_JOB.id}`}
                        className="text-accent underline-offset-4 hover:underline"
                      >
                        {CURRENT_JOB.company}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              <a href="#experience" className="btn btn--aqua mt-fluid-s">
                {t('hero.viewExperience')}
                <HugeiconsIcon icon={ArrowDown01Icon} className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Window>

        <Shortcuts className="flex flex-wrap justify-center gap-1 @3xl:flex-col" />
      </div>
    </div>
  );
}
