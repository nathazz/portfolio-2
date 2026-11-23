import type { CSSProperties, ReactNode } from 'react';

interface WindowProps {
  id: string;
  title: string;
  level?: 1 | 2;
  status?: ReactNode;
  flush?: boolean;
  className?: string;
  children: ReactNode;
}

const LIGHTS = ['#ff5f57', '#febc2e', '#28c840'];

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
