import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing a line 40% down the
 * viewport, or null when none is (e.g. at the very top of the page).
 * A line works for sections of any height, unlike a visibility threshold,
 * which a section taller than the viewport can never reach.
 */
export function useActiveSection<Id extends string>(ids: readonly Id[]): Id | null {
  const [active, setActive] = useState<Id | null>(null);

  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-40% 0px -60% 0px' },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
