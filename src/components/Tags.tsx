export function Tags({ items, variant = 'accent' }: { items: string[]; variant?: 'accent' | 'neutral' }) {
  if (!items.length) return null;
  return (
    <ul className={`tags tags-${variant}`}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
