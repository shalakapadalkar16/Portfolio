import { earlierRoles, jobs } from '../data/profile';
import { Reveal } from './Reveal';
import { Rich } from './Rich';
import { Section } from './Section';
import { Tags } from './Tags';

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="timeline">
        {jobs.map((job) => (
          <li key={`${job.company}-${job.start}`} className={`job${job.current ? ' current' : ''}`}>
            <Reveal className="job-inner">
              <div className="job-meta">
                <span className="job-date">
                  {job.start} — {job.end}
                </span>
                <span className="job-loc">{job.location}</span>
              </div>
              <div className="job-body">
                <h3>
                  {job.role} <span className="at">@ {job.client ?? job.company}</span>
                  {job.current && <span className="badge">Current</span>}
                </h3>
                {job.client && <p className="job-via">Contract via {job.company}</p>}
                {job.summary && <p className="job-summary">{job.summary}</p>}
                {job.bullets.length > 0 && (
                  <ul className="bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>
                        <Rich text={b} />
                      </li>
                    ))}
                  </ul>
                )}
                <Tags items={job.tags} />
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <details className="earlier">
          <summary>Earlier roles</summary>
          <ul>
            {earlierRoles.map((r) => (
              <li key={r.role + r.org}>
                <strong>{r.role}</strong>, {r.org} · <span className="mono-sm">{r.period}</span>
                <br />
                <span className="muted">{r.note}</span>
              </li>
            ))}
          </ul>
        </details>
      </Reveal>
    </Section>
  );
}
