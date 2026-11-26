import type { Facet } from '../services/requests/bluesky/posts';

export interface RichSegment {
  text: string;
  kind: 'text' | 'link' | 'tag';
  href?: string;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toSegment(feature: Facet['features'][number], text: string): RichSegment {
  return feature.$type === 'app.bsky.richtext.facet#link'
    ? { text, kind: 'link', href: feature.uri }
    : { text, kind: 'tag' };
}

export function splitRichText(text: string, facets: Facet[] = []): RichSegment[] {
  const bytes = encoder.encode(text);
  const slice = (start: number, end?: number) => decoder.decode(bytes.slice(start, end));

  const { segments, cursor } = [...facets]
    .sort((a, b) => a.index.byteStart - b.index.byteStart)
    .reduce(
      (acc, { index: { byteStart, byteEnd }, features: [feature] }) =>
        !feature || byteStart < acc.cursor
          ? acc
          : {
              cursor: byteEnd,
              segments: [
                ...acc.segments,
                { text: slice(acc.cursor, byteStart), kind: 'text' as const },
                toSegment(feature, slice(byteStart, byteEnd)),
              ],
            },
      { segments: [] as RichSegment[], cursor: 0 },
    );

  return [...segments, { text: slice(cursor), kind: 'text' as const }].filter(
    (segment) => segment.text,
  );
}
