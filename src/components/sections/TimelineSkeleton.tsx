import { useTranslation } from 'react-i18next';

export function FeedSkeleton() {
  return (
    <ul className="feed" aria-hidden="true">
      {[0, 1, 2].map((key) => (
        <li key={key} className="post post--ghost">
          <span className="post__rail">
            <span className="ghost-dot" />
          </span>
          <div className="post__body">
            <span className="ghost-line w-1/3" />
            <span className="ghost-line w-full" />
            <span className="ghost-line w-2/3" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function TimelineSkeleton() {
  const { t } = useTranslation();

  return (
    <>
      <div className="feed-profile post--ghost" aria-hidden="true">
        <span className="avatar" />
        <div className="grid gap-2">
          <span className="ghost-line w-32" />
          <span className="ghost-line w-24" />
        </div>
      </div>
      <div className="feed-scroll" aria-busy="true">
        <FeedSkeleton />
      </div>
      <footer className="window__status">
        <span className="orb" aria-hidden="true" />
        {t('timeline.loading')}
      </footer>
    </>
  );
}
