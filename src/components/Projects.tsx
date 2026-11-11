import { projects } from '../data/profile';
import { ArrowUpRight } from './Icons';
import { Reveal } from './Reveal';
import { Rich } from './Rich';
import { Section } from './Section';
import { Tags } from './Tags';

export function Projects() {
  return (
    <Section id="projects" title="Selected projects">
      <div className="projects">
        {projects.map((p) => (
          <Reveal key={p.name} className="project-wrap">
            <article className="project">
              <header>
                <div className="project-top">
                  <span className="project-date">{p.period}</span>
                  <span className="project-links">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer">
                        Code <ArrowUpRight />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer">
                        Live <ArrowUpRight />
                      </a>
                    )}
                  </span>
                </div>
                <h3>{p.name}</h3>
                <p className="project-sub">{p.summary}</p>
              </header>

              <ol className="flow" aria-label="Request flow">
                {p.flow.map((node) => (
                  <li key={node}>{node}</li>
                ))}
              </ol>

              <ul className="bullets">
                {p.bullets.map((b, i) => (
                  <li key={i}>
                    <Rich text={b} />
                  </li>
                ))}
              </ul>

              <Tags items={p.stack} />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
