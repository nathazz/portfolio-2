import { bskyApi } from '../../api.config';

export interface Author {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

export interface Profile extends Author {
  description?: string;
  postsCount?: number;
  followersCount?: number;
}

export interface Facet {
  index: { byteStart: number; byteEnd: number };
  features: Array<
    | { $type: 'app.bsky.richtext.facet#link'; uri: string }
    | { $type: 'app.bsky.richtext.facet#mention'; did: string }
    | { $type: 'app.bsky.richtext.facet#tag'; tag: string }
  >;
}

interface PostRecord {
  $type: 'app.bsky.feed.post';
  text: string;
  createdAt: string;
  langs?: string[];
  facets?: Facet[];
}

export interface ImageView {
  thumb: string;
  fullsize: string;
  alt: string;
  aspectRatio?: { width: number; height: number };
}

export interface ExternalView {
  uri: string;
  title: string;
  description: string;
  thumb?: string;
}

export interface Embed {
  $type: string;
  images?: ImageView[];
  external?: ExternalView;
  thumbnail?: string;
  alt?: string;
  aspectRatio?: { width: number; height: number };
  media?: Embed;
}

export interface Post {
  uri: string;
  cid: string;
  author: Author;
  record: PostRecord;
  embed?: Embed;
  replyCount?: number;
  repostCount?: number;
  likeCount?: number;
  indexedAt: string;
}

export interface FeedViewPost {
  post: Post;
  reason?: { $type: string; by?: Author };
}

export interface AuthorFeedResponse {
  feed: FeedViewPost[];
  cursor?: string;
}

export async function getAuthorFeed(
  actor: string,
  opts: { limit?: number; cursor?: string; signal?: AbortSignal } = {},
): Promise<AuthorFeedResponse> {
  const { signal, ...params } = opts;

  const { data } = await bskyApi.get<AuthorFeedResponse>('/app.bsky.feed.getAuthorFeed', {
    params: { actor, filter: 'posts_and_author_threads', ...params },
    signal,
  });

  return data;
}

export async function getProfile(actor: string, signal?: AbortSignal): Promise<Profile> {
  const { data } = await bskyApi.get<Profile>('/app.bsky.actor.getProfile', {
    params: { actor },
    signal,
  });

  return data;
}
