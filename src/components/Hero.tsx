import { profile } from '../data/profile';
import { asset } from '../lib/utils';
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export function Hero() {
  const { links } = profile;
  return (
    <section className="hero container" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          {profile.role} · {profile.focus}
        </p>
        <h1>
          Hi, I'm {profile.firstName}.
          <br />
          <span className="muted-strong">{profile.headline}</span>
        </h1>
        <p className="lead">{profile.intro}</p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            View my work
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get in touch
          </a>
          {links.resume && (
            <a href={asset(links.resume)} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              Résumé <ArrowUpRight className="btn-icon" />
            </a>
          )}
        </div>

        <ul className="social" aria-label="Elsewhere">
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </li>
          {links.github && (
            <li>
              <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </li>
          )}
          <li>
            <a href="#contact" aria-label="Contact form">
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>

      <div className="hero-visual">
        <div className="portrait">
          <img src={asset(profile.photo)} alt={`Portrait of ${profile.name}`} width={747} height={1024} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}
