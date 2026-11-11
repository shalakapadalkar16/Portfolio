/**
 * ─────────────────────────────────────────────────────────────
 *  All site content lives here. Edit this file to update the site.
 *  Use **double asterisks** for bold text in any sentence.
 * ─────────────────────────────────────────────────────────────
 */
import type {
  Certification,
  EarlierRole,
  Education,
  Job,
  Metric,
  NavSection,
  Profile,
  Project,
  SkillGroup,
} from '../types';

export const profile: Profile = {
  name: 'Shalaka Padalkar',
  firstName: 'Shalaka',
  role: 'Software Engineer',
  focus: 'Backend & Data Systems',
  headline: 'I build backends that stay fast under load.',
  intro:
    "I design APIs, services and data pipelines in Java, Python and TypeScript, with attention to latency, reliability and clean contracts. My background in ML and supply-chain data engineering means I'm comfortable anywhere from the database up to the model.",
  location: 'United States',
  photo: 'profile.jpg',
  links: {
    linkedin: 'https://www.linkedin.com/in/shalaka-padalkar',
    github: '', // TODO: e.g. 'https://github.com/your-username'
    resume: '', // TODO: drop the PDF in /public and set e.g. 'Shalaka_Padalkar_Resume.pdf'
  },
  about: [
    "I'm a software engineer at **Tata Consultancy Services**, currently working on contract with **Citi**, focused on backend systems: REST APIs, microservices, authentication, caching, messaging and the data layer underneath.",
    'Before that I was a **Machine Learning Engineer at Community Dreams Foundation**, where I built the API and pipeline layer for an AI health-analytics platform. Earlier, at **Accenture**, I spent two years building the data pipelines behind demand forecasting for 90+ countries and 1,000+ SKUs.',
    'I hold an **M.S. in Electrical & Computer Engineering** from Northeastern University (Machine Learning & Algorithms). I like systems that are observable, well tested and uneventful in production.',
  ],
  facts: [
    { label: 'Currently', value: 'Software Engineer @ Citi (via TCS)' },
    { label: 'Based in', value: 'United States' },
    { label: 'Focus', value: 'Backend · APIs · Distributed systems' },
    { label: 'Certified', value: 'AWS Cloud Practitioner' },
    { label: 'Experience', value: '4+ years across SWE, ML & data' },
  ],
};

export const sections: NavSection[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const metrics: Metric[] = [
  { value: '<180ms', label: 'avg API latency at 5K+ requests/month' },
  { value: '95%', label: 'of requests served in under 120ms' },
  { value: '−30%', label: 'LLM inference cost via caching & retries' },
  { value: '90+', label: 'countries served by pipelines I built' },
];

export const jobs: Job[] = [
  {
    role: 'Software Engineer',
    company: 'Tata Consultancy Services',
    client: 'Citi',
    start: 'Jun 2026',
    end: 'Present',
    location: 'United States',
    current: true,
    // TODO: add 2–3 bullets about your work at Citi (bullets: [...])
    bullets: [],
    tags: [],
  },
  {
    role: 'Machine Learning Engineer',
    company: 'Community Dreams Foundation',
    start: 'Jun 2025',
    end: 'Jun 2026',
    location: 'Boston, MA',
    bullets: [
      'Led development of an AI health-analytics platform with clinicians and engineers, automating OCR-based extraction of **20+ biomarkers** and cutting manual processing time by **70%**.',
      'Designed and shipped **Supabase-backed REST APIs** serving **5K+ requests/month** at under **180ms** average latency.',
      'Built LLM-powered recommendation pipelines with **caching and retry** logic, reducing inference cost by **30%** and making responses more reliable.',
      'Built ML pipelines that connect preprocessing, model inference and structured storage for downstream analytics.',
      'Worked with product and design on **TypeScript dashboards** that cut insight delivery time by **40%**.',
    ],
    tags: ['Python', 'Supabase', 'PostgreSQL', 'REST', 'LLMs', 'TypeScript'],
  },
  {
    role: 'Software Engineer',
    company: 'Accenture',
    start: 'Jun 2021',
    end: 'Jul 2023',
    location: 'Pune, India',
    bullets: [
      'Built scalable data pipelines feeding SAP IBP demand forecasting across **90+ countries** and **1,000+ SKUs**, raising throughput by **20%** and cutting processing time by **15%**.',
      'Optimized scheduling logic and pipeline orchestration, reducing planning cycle time by **10%**.',
      'Ran validation and regression testing across teams, reducing data inconsistencies by **25%** and making releases more reliable.',
      'Led root-cause analysis across logs and optimizer outputs, fixing recurring production issues and lowering incident frequency by **20%**.',
      'Supported scenario-based supply plan optimization across **11 production sites**.',
    ],
    tags: ['ETL', 'SQL', 'SAP IBP', 'Data validation', 'Monitoring'],
  },
];

export const earlierRoles: EarlierRole[] = [
  {
    role: 'Research Intern',
    org: 'Manman India',
    period: 'Aug 2020 – Jan 2021',
    note: 'DC-DC converter design and simulation for power electronics.',
  },
  {
    role: 'Technical Team Member',
    org: 'The Robotics Forum, VIT Pune',
    period: 'Jul 2019 – Jul 2020',
    note: 'Led a multidisciplinary team building autonomous robots for the national Robocon competition; ran workshops for 100+ students.',
  },
  {
    role: 'Summer Intern',
    org: 'Vishwakarma Institute of Technology',
    period: 'Jun – Jul 2018',
    note: 'PLC programming, embedded systems and microcontrollers.',
  },
];

export const projects: Project[] = [
  {
    name: 'Pantry2Plate Platform',
    period: 'Nov 2025 – Present',
    summary: 'A recipe and pantry platform API with versioned REST endpoints, search, auth and CI/CD.',
    flow: ['Client', 'NestJS API', 'Redis', 'PostgreSQL'],
    bullets: [
      'Versioned REST APIs with **JWT auth + RBAC**, serving **10K+ monthly requests**.',
      '**Redis caching** and **Meilisearch** indexing made queries **45%** faster, with **95%** of requests under **120ms**.',
      'Rate limiting and centralized error handling cut API failures by **30%**.',
      'GitHub Actions CI with **85% test coverage** and automated container deploys to AWS ECS.',
    ],
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'Meilisearch', 'AWS ECS', 'GitHub Actions'],
  },
  {
    name: 'AI Fitness Tracker',
    period: 'May 2025 – Oct 2025',
    summary: 'An event-driven microservices backend with centralized identity and full observability.',
    flow: ['Keycloak (OIDC)', 'Spring Boot services', 'RabbitMQ', 'Prometheus'],
    bullets: [
      'Microservices architecture on **Spring Boot + RabbitMQ** handling **300+ events/min**.',
      'APIs secured with **OAuth2/OIDC via Keycloak**, with RBAC enforced across services to protect sensitive user data.',
      '**Prometheus metrics** and distributed tracing cut debugging time by **35%**.',
    ],
    stack: ['Java', 'Spring Boot', 'RabbitMQ', 'Keycloak', 'Docker', 'Prometheus'],
  },
  {
    name: 'Research Assistant Backend',
    period: 'Jan 2025 – Apr 2025',
    summary: 'A document search service with async processing and documented, tested APIs.',
    flow: ['Streamlit UI', 'FastAPI', 'Task queue', 'Elasticsearch'],
    bullets: [
      'Search APIs on **FastAPI + Elasticsearch** indexing **500+ documents**.',
      'Background task queues and caching layers improved query latency by **40%**.',
      '**OpenAPI** docs and integration tests reduced defects by **25%**.',
    ],
    stack: ['Python', 'FastAPI', 'Elasticsearch', 'Streamlit', 'OpenAPI'],
  },
];

export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { name: 'Backend', items: ['Spring Boot', 'FastAPI', 'Flask', 'NestJS', 'REST', 'Microservices'] },
  { name: 'Auth & Security', items: ['OAuth2 / OIDC', 'JWT', 'Keycloak', 'RBAC'] },
  { name: 'Databases & Caching', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase'] },
  { name: 'Cloud & DevOps', items: ['AWS (ECS)', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD'] },
  { name: 'Messaging & Search', items: ['RabbitMQ', 'Elasticsearch', 'Meilisearch'] },
  { name: 'Observability', items: ['Prometheus', 'Grafana', 'Logging', 'Tracing'] },
  { name: 'Data & ML', items: ['ETL pipelines', 'Airflow', 'MLflow', 'LLM integration', 'OCR'] },
];

export const education: Education[] = [
  {
    school: 'Northeastern University',
    degree: 'M.S. Electrical & Computer Engineering (Machine Learning & Algorithms) · GPA 3.7/4.0',
    period: 'Sep 2023 – May 2025',
    detail:
      'Coursework: Machine Learning, Parallel Data Processing, Database Systems, MLOps, Reinforcement Learning, Computer Vision, Data Visualization',
  },
  {
    school: 'Vishwakarma Institute of Technology, Pune',
    degree: 'B.Tech Electrical, Electronics & Communications Engineering',
    period: 'Aug 2017 – Jun 2021',
  },
];

export const certifications: Certification[] = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
];
