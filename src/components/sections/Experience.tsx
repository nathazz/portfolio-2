import { useTranslation } from 'react-i18next';
import { JOBS, type Job, type JobCopy } from '../../data/experience';
import { formatYearMonth } from '../../lib/format';
import { Window } from '../layout/Window';

function Period({ start, end }: Pick<Job, 'start' | 'end'>) {
  const { t, i18n } = useTranslation();
  const from = start && <time dateTime={start}>{formatYearMonth(start, i18n.language)}</time>;
  const to = end ? (
    <time dateTime={end}>{formatYearMonth(end, i18n.language)}</time>
  ) : (
    t('experience.present')
  );

  return (
    <p className="font-semibold">
      {from}
      {from && ' – '}
      {to}
    </p>
  );
}

function JobEntry({ job }: { job: Job }) {
  const { t } = useTranslation();
  // The locale files hold one JobCopy per job id.
  const copy = t(`experience.jobs.${job.id}`, { returnObjects: true }) as JobCopy;
  const isCurrent = job.end === null;

  return (
    <li id={`job-${job.id}`} className="job">
      <div className="job__rail" aria-hidden="true">
        <span className={isCurrent ? 'orb orb--leaf' : 'orb'} />
      </div>

      <div className="job__meta">
        <Period start={job.start} end={job.end} />
        {copy.location && <p className="text-fluid-sm text-ink-faint">{copy.location}</p>}
      </div>

      <article className="job__body">
        <h3 className="text-fluid-xl font-semibold">{copy.role}</h3>
        <p className="text-fluid-lg text-accent font-medium">{job.company}</p>

        {copy.summary && <p className="text-ink-soft mt-fluid-xs max-w-[75ch]">{copy.summary}</p>}

        {copy.groups.length > 0 && (
          <div className="gap-fluid-s mt-fluid-s grid grid-cols-[repeat(auto-fit,minmax(min(100%,21rem),1fr))]">
            {copy.groups.map((group) => (
              <section key={group.title}>
                {group.title && (
                  <h4 className="text-fluid-xs text-ink-faint mb-fluid-2xs font-semibold tracking-wider uppercase">
                    {group.title}
                  </h4>
                )}
                <ul className="beads text-fluid-sm text-ink-soft">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {job.stack.length > 0 && (
          <ul className="border-rule mt-fluid-s pt-fluid-xs flex flex-wrap gap-2 border-t">
            {job.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}

export function Experience() {
  const { t } = useTranslation();

  return (
    <Window
      id="experience"
      title={t('experience.title')}
      status={t('experience.status', { count: JOBS.length })}
    >
      <p className="text-ink-soft mb-fluid-s">{t('experience.description')}</p>
      <ol className="timeline">
        {JOBS.map((job) => (
          <JobEntry key={job.id} job={job} />
        ))}
      </ol>
    </Window>
  );
}
