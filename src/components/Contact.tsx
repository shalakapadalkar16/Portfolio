import { profile } from '../data/profile';
import type { Notify } from '../hooks/useToast';
import { ContactForm } from './ContactForm';
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from './Icons';
import { Section } from './Section';

export function Contact({ notify }: { notify: Notify }) {
  const { links } = profile;
  return (
    <Section id="contact" title="Let's talk" className="contact">
      <div className="contact-card">
        <div className="contact-intro">
          <p className="lead">
            I'm happy to talk about backend roles, interesting systems problems, or anything on this page. Send a
            message below and it comes straight to me.
          </p>

          <ul className="quick-links">
            <li>
              <LinkedInIcon />
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight className="inline-icon" />
              </a>
            </li>
            {links.github && (
              <li>
                <GitHubIcon />
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight className="inline-icon" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <ContactForm notify={notify} />
      </div>
    </Section>
  );
}
