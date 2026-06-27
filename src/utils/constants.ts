import type { Skill } from '../types/types';

export const EMAIL = 'nathas0208@gmail.com';
export const GITHUB_USERNAME = 'nathazz';

export const SECTIONS = [
  { id: 'home', label: 'navbar.home' },
  { id: 'about', label: 'navbar.about' },
  { id: 'experience', label: 'navbar.xp' },
  { id: 'projects', label: 'navbar.project' },
  { id: 'contact', label: 'navbar.contacts' },
];

export const ALL_SKILLS: Skill[] = [
  { name: 'TypeScript', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'Go', category: 'languages' },
  { name: 'SQL', category: 'languages' },

  { name: 'React / Next.js', category: 'frameworks' },
  { name: 'React Query / TanStack', category: 'frameworks' },
  { name: 'Node.js (Express.js, Nest.js)', category: 'frameworks' },
  { name: 'Gin-Gonic (Golang)', category: 'frameworks' },
  { name: 'Tailwind', category: 'frameworks' },

  { name: 'Docker & Docker Compose', category: 'infra' },
  { name: 'CI / CD', category: 'infra' },
  { name: 'GCP', category: 'infra' },
  { name: 'Cloudflare', category: 'infra' },
  { name: 'AWS (RDS, CloudWatch, VPC, ECR, ECS, EC2, S3, Lambda, ELB, Fargate', category: 'infra' },
  { name: 'Terraform', category: 'infra' },
  { name: 'GitHub Actions', category: 'infra' },
  { name: 'RabbitMQ', category: 'infra' },

  { name: 'PostgreSQL', category: 'databases' },
  { name: 'MySQL', category: 'databases' },
  { name: 'MongoDB', category: 'databases' },
  { name: 'Redis', category: 'databases' },

  { name: 'Jest', category: 'testing' },
  { name: 'Vitest', category: 'testing' },
  { name: 'Pytest', category: 'testing' },
  { name: 'SuperTest', category: 'testing' },
  { name: 'Cypress', category: 'testing' },

  { name: 'OpenAI API', category: 'ai' },
  { name: 'Claude', category: 'ai' },
  { name: 'GitHub Copilot', category: 'ai' },
  { name: 'Linux (Ubuntu)', category: 'other' },
  { name: 'Swagger', category: 'other' },
  { name: 'Figma', category: 'other' },
];

export const CATEGORIES = [
  {
    id: 'all',
    label: 'about-me.categories.all',
  },
  {
    id: 'languages',
    label: 'about-me.categories.languages',
  },
  {
    id: 'frameworks',
    label: 'about-me.categories.frameworks',
  },
  {
    id: 'infra',
    label: 'about-me.categories.infra',
  },
  {
    id: 'databases',
    label: 'about-me.categories.databases',
  },
  {
    id: 'testing',
    label: 'about-me.categories.testing',
  },
  {
    id: 'ai',
    label: 'about-me.categories.ai',
  },
  {
    id: 'other',
    label: 'about-me.categories.other',
  },
];
