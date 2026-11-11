import { profile } from '../data/profile';
import { Reveal } from './Reveal';
import { Rich } from './Rich';
import { Section } from './Section';

export function About() {
  return (
    <Section id="about" title="About">
      <div className="about-grid">
        <Reveal className="about-text">
          {profile.about.map((p, i) => (
            <p key={i}>
              <Rich text={p} />
            </p>
          ))}
        </Reveal>
        <Reveal>
          <dl className="about-facts">
            {profile.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
