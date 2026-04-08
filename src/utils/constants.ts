import { Code, Palette, Zap } from 'lucide-react';

export const skills = [
  {
    name: 'Frontend',
    icon: Code,
    items: [
      'React',
      'TypeScript',
      'Tailwind',
      'React-Query',
      'Zustand/Context API/Redux',
      'TanStack Router',
    ],
  },
  {
    name: 'Backend',
    icon: Zap,
    items: [
      'Node.js (Express/Nest.js)',
      'Golang (Gin/Fiber)',
      'Java (Spring Boot) | Basics',
      'SQl (MySQL, PostgreSQL)',
      'NoSQL (Redis, MongoDB)',
      'RabbitMQ',
      'API Restful',
      'AWS',
    ],
  },
  {
    name: 'Others',
    icon: Palette,
    items: [
      'Jest, SuperTest, Vitest, Native tests (Golang)',
      'Docker & Docker Compose',
      'CI/CD',
      'Git/Github',
      'LLM & Agents (Gemini, OpenAI, Ollama, Claude)',
      'Linux (Ubuntu)',
      'Swagger',
      'Figma',
    ],
  },
];


export const SECTIONS = [
  { id: 'home', label: 'navbar.home' },
  { id: 'about', label: 'navbar.about' },
  { id: 'experience', label: 'navbar.xp' },
  { id: 'projects', label: 'navbar.project' },
  { id: 'contact', label: 'navbar.contacts' },
];

export const GITHUB_USERNAME = 'nathazz';
