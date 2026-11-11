import { skills } from '../data/profile';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { Tags } from './Tags';

export function Skills() {
  return (
    <Section id="skills" title="Technical skills">
      <div className="skills">
        {skills.map((g) => (
          <Reveal key={g.name} className="skill-group">
            <h3>{g.name}</h3>
            <Tags items={g.items} variant="neutral" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
