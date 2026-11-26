import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAuthorFeed, getProfile } from '../requests/bluesky/posts';

export const feedKey = (actor: string) => ['feed', actor] as const;
export const profileKey = (actor: string) => ['profile', actor] as const;

export function useAuthorFeed(actor: string) {
  return useInfiniteQuery({
    queryKey: feedKey(actor),
    queryFn: ({ pageParam, signal }) =>
      getAuthorFeed(actor, { limit: 10, cursor: pageParam, signal }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.cursor,
    staleTime: 60_000,
    gcTime: 30 * 60_000,
    refetchInterval: 5 * 60_000,
  });
}

export function useProfile(actor: string) {
  return useQuery({
    queryKey: profileKey(actor),
    queryFn: ({ signal }) => getProfile(actor, signal),
    staleTime: 30 * 60_000,
  });
}
