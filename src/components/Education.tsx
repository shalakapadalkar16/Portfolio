import { certifications, education } from '../data/profile';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="edu">
        {education.map((e) => (
          <Reveal key={e.school} className="card edu-item">
            <div className="edu-head">
              <h3>{e.school}</h3>
              <span className="edu-date">{e.period}</span>
            </div>
            <p className="edu-degree">{e.degree}</p>
            {e.detail && <p className="edu-detail">{e.detail}</p>}
          </Reveal>
        ))}
        {certifications.map((c) => (
          <Reveal key={c.name} className="card edu-item cert">
            <div className="edu-head">
              <h3>{c.name}</h3>
              <span className="edu-date">Certification</span>
            </div>
            <p className="edu-degree">{c.issuer}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
