/**
 * Content model for the portfolio.
 * Text fields support **bold** markup (rendered by <Rich />).
 */

export interface NavSection {
  id: string;
  label: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Job {
  role: string;
  /** Employer of record. */
  company: string;
  /** Client you're placed with on contract; shown as the headline company when set. */
  client?: string;
  start: string;
  end: string;
  location: string;
  current?: boolean;
  summary?: string;
  bullets: string[];
  tags: string[];
}

export interface EarlierRole {
  role: string;
  org: string;
  period: string;
  note: string;
}

export interface Project {
  name: string;
  period: string;
  summary: string;
  /** Request / data flow through the system, rendered as a pipeline. */
  flow: string[];
  bullets: string[];
  stack: string[];
  repo?: string;
  live?: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  detail?: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  focus: string;
  headline: string;
  intro: string;
  location: string;
  photo: string;
  links: {
    linkedin: string;
    /** Leave empty to hide the GitHub icon. */
    github: string;
    /** Path inside /public, e.g. "Shalaka_Padalkar_Resume.pdf". Empty hides the button. */
    resume: string;
  };
  about: string[];
  facts: Fact[];
}
