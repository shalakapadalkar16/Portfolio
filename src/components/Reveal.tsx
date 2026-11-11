import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

/** Block-level wrapper that fades in when scrolled into view. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
