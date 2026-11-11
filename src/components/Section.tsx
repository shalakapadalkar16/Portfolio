import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  lead?: ReactNode;
}

export function Section({ id, title, children, className = '', lead }: Props) {
  return (
    <section id={id} className={`section container ${className}`} aria-labelledby={`${id}-title`}>
      <div className="section-head">
        <h2 id={`${id}-title`}>{title}</h2>
        {lead && <p className="section-lead">{lead}</p>}
      </div>
      {children}
    </section>
  );
}
