import { useEffect, useState } from 'react';

export function useActiveSection<Id extends string>(ids: readonly Id[]): Id | null {
  const [active, setActive] = useState<Id | null>(null);

  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) =>
          isIntersecting ? visible.add(target.id) : visible.delete(target.id),
        );
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-40% 0px -60% 0px' },
    );

    ids
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null)
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
