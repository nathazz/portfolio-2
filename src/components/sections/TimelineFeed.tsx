import { HugeiconsIcon } from '@hugeicons/react';
import type { CSSProperties, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { BLUESKY_HANDLE, OWNER_NAME } from '../../data/site';
import { formatPostDate, formatRelative } from '../../utils/format';
import { splitRichText } from '../../utils/richText';
import { baseLanguage, needsTranslation, translateUrl } from '../../utils/translate';
import { hostname } from '../../utils/url';
import { Activity01Icon, RefreshIcon, RepeatIcon, TranslateIcon } from '../../lib/icons';
import { useNow } from '../../hooks/useNow';
import { useAuthorFeed, useProfile } from '../../services/queries/posts';
import type { Embed, Facet, FeedViewPost } from '../../services/requests/bluesky/posts';
import { FeedSkeleton } from './TimelineSkeleton';

function RichText({ text, facets }: { text: string; facets?: Facet[] }) {
  return (
    <p className="post__text">
      {splitRichText(text, facets).map(({ text: label, kind, href }, index) =>
        kind === 'link' ? (
          <a key={index} href={href} target="_blank" rel="noreferrer">
            {label}
          </a>
        ) : kind === 'tag' ? (
          <span key={index} className="post__tag">
            {label}
          </span>
        ) : (
          label
        ),
      )}
    </p>
  );
}

function PostEmbed({ embed }: { embed?: Embed }) {
  if (!embed) return null;

  if (embed.media) return <PostEmbed embed={embed.media} />;

  if (embed.images?.length) {
    const single = embed.images.length === 1;
    return (
      <div className="post__media" data-count={embed.images.length}>
        {embed.images.map((image) => (
          <img
            key={image.thumb}
            src={image.thumb}
            alt={image.alt}
            loading="lazy"
            style={
              single && image.aspectRatio
                ? ({
                    aspectRatio: `${image.aspectRatio.width} / ${image.aspectRatio.height}`,
                  } as CSSProperties)
                : undefined
            }
          />
        ))}
      </div>
    );
  }

  if (embed.thumbnail) {
    return (
      <div className="post__media" data-count="1">
        <img src={embed.thumbnail} alt={embed.alt ?? ''} loading="lazy" />
      </div>
    );
  }

  if (embed.external) {
    const { uri, title, description, thumb } = embed.external;
    return (
      <a href={uri} target="_blank" rel="noreferrer" className="post__card">
        {thumb && <img src={thumb} alt="" loading="lazy" />}
        <span className="post__card-body">
          <span className="post__card-host">{hostname(uri)}</span>
          <strong>{title}</strong>
          {description && <span className="post__card-desc">{description}</span>}
        </span>
      </a>
    );
  }

  return null;
}

function Avatar({ src, name }: { src?: string; name: string }) {
  return src ? (
    <img className="avatar" src={src} alt="" loading="lazy" />
  ) : (
    <span className="avatar avatar--empty" aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function PostItem({ item, now, latest }: { item: FeedViewPost; now: Date; latest: boolean }) {
  const { t, i18n } = useTranslation();
  const { post, reason } = item;
  const reposted = reason?.$type === 'app.bsky.feed.defs#reasonRepost';
  const language = baseLanguage(i18n.language);
  const createdAt = new Date(post.record.createdAt);
  const translatable = !!post.record.text && needsTranslation(post.record.langs, language);

  return (
    <li className="post">
      <span className="post__rail" aria-hidden="true">
        <span className={latest ? 'post__marker post__marker--latest' : 'post__marker'} />
      </span>
      <article className="post__body">
        <header className="post__head">
          <time dateTime={post.record.createdAt} className="font-semibold">
            {formatPostDate(createdAt, now, i18n.language)}
          </time>
          <span className="text-ink-faint">{formatRelative(createdAt, now, i18n.language)}</span>
        </header>

        {reposted && (
          <p className="post__context">
            <HugeiconsIcon icon={RepeatIcon} aria-hidden="true" />
            {t('timeline.repostedFrom', {
              name: post.author.displayName || post.author.handle,
            })}
          </p>
        )}

        {post.record.text && <RichText text={post.record.text} facets={post.record.facets} />}
        {translatable && (
          <a
            href={translateUrl(post.record.text, language)}
            target="_blank"
            rel="noreferrer"
            className="post__translate"
          >
            <HugeiconsIcon icon={TranslateIcon} aria-hidden="true" />
            {t('timeline.translate')}
          </a>
        )}
        <PostEmbed embed={post.embed} />
      </article>
    </li>
  );
}

function Notice({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="feed-notice">
      <span className="feed-notice__icon" aria-hidden="true">
        <HugeiconsIcon icon={Activity01Icon} />
      </span>
      <p className="font-semibold">{title}</p>
      <p className="text-ink-soft text-fluid-sm max-w-[42ch]">{text}</p>
      {action}
    </div>
  );
}

export default function TimelineFeed() {
  const { t, i18n } = useTranslation();
  const now = useNow(60_000);
  const profile = useProfile(BLUESKY_HANDLE);
  const feed = useAuthorFeed(BLUESKY_HANDLE);
  const name = profile.data?.displayName || OWNER_NAME;
  const items = feed.data?.pages.flatMap((page) => page.feed) ?? [];

  const status = (
    <>
      <span className={feed.isError ? 'orb orb--danger' : 'orb orb--leaf'} aria-hidden="true" />
      <span className="truncate">
        {feed.isError
          ? t('timeline.offline')
          : feed.dataUpdatedAt
            ? t('timeline.updated', {
                time: formatRelative(new Date(feed.dataUpdatedAt), now, i18n.language),
              })
            : t('timeline.loading')}
      </span>
      <button
        type="button"
        className="feed-refresh"
        onClick={() => feed.refetch()}
        disabled={feed.isFetching}
        aria-label={t('timeline.refresh')}
        title={t('timeline.refresh')}
      >
        <HugeiconsIcon
          icon={RefreshIcon}
          aria-hidden="true"
          data-spin={feed.isFetching || undefined}
        />
      </button>
    </>
  );

  let body: ReactNode;
  if (feed.isPending) {
    body = <FeedSkeleton />;
  } else if (feed.isError) {
    body = (
      <Notice
        title={t('timeline.errorTitle')}
        text={t('timeline.errorText')}
        action={
          <button
            type="button"
            className="btn btn--raised btn--small"
            onClick={() => feed.refetch()}
          >
            {t('timeline.retry')}
          </button>
        }
      />
    );
  } else if (items.length === 0) {
    body = <Notice title={t('timeline.emptyTitle')} text={t('timeline.emptyText')} />;
  } else {
    body = (
      <>
        <ul className="feed">
          {items.map((item, index) => (
            <PostItem
              key={`${item.post.cid}-${item.reason?.$type ?? ''}`}
              item={item}
              now={now}
              latest={index === 0}
            />
          ))}
        </ul>
        {feed.hasNextPage && (
          <div className="p-fluid-xs text-center">
            <button
              type="button"
              className="btn btn--raised btn--small"
              onClick={() => feed.fetchNextPage()}
              disabled={feed.isFetchingNextPage}
            >
              {feed.isFetchingNextPage ? t('timeline.loading') : t('timeline.loadMore')}
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <header className="feed-profile">
        <Avatar src={profile.data?.avatar} name={name} />
        <div className="min-w-0">
          <p className="truncate font-semibold">{name}</p>
          <p className="text-ink-faint text-fluid-sm truncate">{t('timeline.subtitle')}</p>
        </div>
      </header>
      <div className="feed-scroll" aria-busy={feed.isFetching}>
        {body}
      </div>
      <footer className="window__status">{status}</footer>
    </>
  );
}
