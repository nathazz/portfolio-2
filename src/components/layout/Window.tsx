import type { CSSProperties, ReactNode } from 'react';

interface WindowProps {
  /** Anchor id, also used to label the window for assistive tech. */
  id: string;
  title: string;
  /** Heading level of the title: 1 for the page's main window, 2 for the rest. */
  level?: 1 | 2;
  /** Optional line in the status bar along the bottom edge. */
  status?: ReactNode;
  /** Drops the body padding, for content that runs edge to edge. */
  flush?: boolean;
  className?: string;
  children: ReactNode;
}

const LIGHTS = ['#ff5f57', '#febc2e', '#28c840'];

/**
 * A desktop window: title bar with the three gel buttons, a body, and an
 * optional status bar. The buttons are decoration only. The body is a size
 * container, so children can use container-query variants (@2xl:, @3xl:).
 */
export function Window({
  id,
  title,
  level = 2,
  status,
  flush = false,
  className = '',
  children,
}: WindowProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={`window ${className}`}>
      <header className="window__bar">
        <div className="window__lights" aria-hidden="true">
          {LIGHTS.map((color) => (
            <span key={color} style={{ '--light': color } as CSSProperties} />
          ))}
        </div>
        <Heading id={titleId} className="window__title">
          {title}
        </Heading>
      </header>

      <div className={flush ? '@container' : 'p-fluid-s @container'}>{children}</div>

      {status && <footer className="window__status">{status}</footer>}
    </section>
  );
}
