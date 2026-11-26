import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { Window } from '../layout/Window';
import { TimelineSkeleton } from './TimelineSkeleton';

const TimelineFeed = lazy(() => import('./TimelineFeed'));

export function Timeline() {
  const { t } = useTranslation();
  const [ref, inView] = useInView<HTMLDivElement>('600px');

  return (
    <Window id="timeline" title={t('timeline.title')} flush>
      <div ref={ref}>
        {inView ? (
          <Suspense fallback={<TimelineSkeleton />}>
            <TimelineFeed />
          </Suspense>
        ) : (
          <TimelineSkeleton />
        )}
      </div>
    </Window>
  );
}
