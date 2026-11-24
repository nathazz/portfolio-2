import { useEffect, useRef } from 'react';

type State = 'idle' | 'walk' | 'slide' | 'sleep' | 'happy';

const SIZE = 48;
const MARGIN = 8;
const WALK_SPEED = 42;
const SLIDE_SPEED = 120;
const NOTICE_RADIUS = 110;
const HAPPY_MS = 900;
const MIN_ZONE = 90;

type Zone = [number, number];

const between = (min: number, max: number) => min + Math.random() * (max - min);

export function usePenguin() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxX = () => Math.max(MARGIN, window.innerWidth - SIZE - MARGIN);

    const layout = (): { zones: Zone[]; lift: number } => {
      const dock = document.querySelector('.dock__shelf')?.getBoundingClientRect();
      if (!dock) return { zones: [[MARGIN, maxX()]], lift: 0 };

      const left: Zone = [MARGIN, dock.left - SIZE - MARGIN];
      const right: Zone = [dock.right + MARGIN, maxX()];
      const sides = [left, right].filter(([from, to]) => to - from >= MIN_ZONE);
      if (sides.length > 0) return { zones: sides, lift: 0 };

      return {
        zones: [[dock.left + MARGIN, dock.right - SIZE - MARGIN]],
        lift: window.innerHeight - dock.top - 4,
      };
    };

    const pickSpot = () => {
      const { zones, lift } = layout();
      const [from, to] = zones[Math.floor(Math.random() * zones.length)];
      element.style.bottom = `${lift}px`;
      return between(from, Math.max(from, to));
    };

    const hiddenByDock = (at: number) => {
      const dock = document.querySelector('.dock__shelf')?.getBoundingClientRect();
      if (!dock || element.style.bottom !== '0px') return false;
      return at + SIZE > dock.left && at < dock.right;
    };

    let x = pickSpot();
    let target = x;
    let direction: 'left' | 'right' = 'right';
    let state: State = 'idle';
    let stateEndsAt = performance.now() + between(1200, 2600);
    let pointerNear = false;
    let lastFrame = performance.now();
    let frameId = 0;

    const render = () => {
      element.style.transform = `translateX(${Math.round(x)}px)`;
      element.dataset.state = state;
      element.dataset.dir = direction;
    };

    const enter = (next: State, durationMs: number) => {
      state = next;
      stateEndsAt = performance.now() + durationMs;
    };

    const travel = (next: 'walk' | 'slide') => {
      target = pickSpot();
      direction = target < x ? 'left' : 'right';
      enter(next, Infinity);
    };

    const chooseNext = () => {
      const roll = Math.random();
      if (roll < 0.12) enter('sleep', between(5000, 9000));
      else if (roll < 0.35) travel('slide');
      else travel('walk');
    };

    const tick = (now: number) => {
      const seconds = Math.min(now - lastFrame, 100) / 1000;
      lastFrame = now;

      if (state === 'walk' || state === 'slide') {
        if (pointerNear && !hiddenByDock(x)) {
          enter('idle', between(1500, 3000));
        } else {
          const step = (state === 'walk' ? WALK_SPEED : SLIDE_SPEED) * seconds;
          const remaining = target - x;
          if (Math.abs(remaining) <= step) {
            x = target;
            enter('idle', between(1500, 4000));
          } else {
            x += Math.sign(remaining) * step;
          }
        }
      } else if (now >= stateEndsAt) {
        if (pointerNear) enter('idle', between(1000, 2000));
        else chooseNext();
      }

      x = Math.min(Math.max(x, MARGIN), maxX());
      render();
      frameId = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const centerX = box.left + box.width / 2;
      const centerY = box.top + box.height / 2;
      pointerNear = Math.hypot(event.clientX - centerX, event.clientY - centerY) < NOTICE_RADIUS;
      if (!pointerNear) return;

      direction = event.clientX < centerX ? 'left' : 'right';
      if (state === 'sleep') enter('idle', between(1000, 2000));
      if (still) render();
    };

    const onClick = () => {
      enter('happy', HAPPY_MS);
      render();
      if (!still) return;
      window.setTimeout(() => {
        state = 'idle';
        render();
      }, HAPPY_MS);
    };

    render();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    element.addEventListener('click', onClick);
    if (!still) frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('click', onClick);
    };
  }, []);

  return ref;
}
