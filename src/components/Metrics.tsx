import { metrics } from '../data/profile';

export function Metrics() {
  return (
    <section className="metrics container" aria-label="Highlights">
      {metrics.map((m) => (
        <div className="metric" key={m.label}>
          <span className="metric-value">{m.value}</span>
          <span className="metric-label">{m.label}</span>
        </div>
      ))}
    </section>
  );
}
