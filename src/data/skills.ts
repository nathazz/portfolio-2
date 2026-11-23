import type { SkillIconName } from './skill-icons';

export interface Skill {
  name: string;
  /** Secondary text shown after the name, e.g. the specific services used. */
  detail?: string;
  /** Key into the generated SKILL_ICONS map (see scripts/render-skill-icons.mjs). */
  icon: SkillIconName;
}

export interface SkillGroup {
  id: 'languages' | 'frameworks' | 'infra' | 'databases' | 'testing' | 'ai' | 'other';
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    skills: [
      { name: 'TypeScript', icon: 'SiTypescript' },
      { name: 'JavaScript', icon: 'SiJavascript' },
      { name: 'Python', icon: 'SiPython' },
      { name: 'Go', icon: 'SiGo' },
      { name: 'SQL', icon: 'TbSql' },
    ],
  },
  {
    id: 'frameworks',
    skills: [
      { name: 'React / Next.js', icon: 'SiReact' },
      { name: 'React Query / TanStack', icon: 'SiReactquery' },
      { name: 'Node.js', detail: 'Express.js, Nest.js', icon: 'SiNodedotjs' },
      { name: 'Gin-Gonic', detail: 'Golang', icon: 'SiGin' },
      { name: 'Tailwind', icon: 'SiTailwindcss' },
    ],
  },
  {
    id: 'infra',
    skills: [
      {
        name: 'AWS',
        detail: 'RDS, CloudWatch, VPC, ECR, ECS, EC2, S3, Lambda, ELB, Fargate',
        icon: 'FaAws',
      },
      { name: 'Docker & Docker Compose', icon: 'SiDocker' },
      { name: 'CI / CD', icon: 'TbInfinity' },
      { name: 'GitHub Actions', icon: 'SiGithubactions' },
      { name: 'Terraform', icon: 'SiTerraform' },
      { name: 'GCP', icon: 'SiGooglecloud' },
      { name: 'Cloudflare', icon: 'SiCloudflare' },
      { name: 'RabbitMQ', icon: 'SiRabbitmq' },
    ],
  },
  {
    id: 'databases',
    skills: [
      { name: 'PostgreSQL', icon: 'SiPostgresql' },
      { name: 'MySQL', icon: 'SiMysql' },
      { name: 'MongoDB', icon: 'SiMongodb' },
      { name: 'Redis', icon: 'SiRedis' },
    ],
  },
  {
    id: 'testing',
    skills: [
      { name: 'Jest', icon: 'SiJest' },
      { name: 'Vitest', icon: 'SiVitest' },
      { name: 'Pytest', icon: 'SiPytest' },
      { name: 'SuperTest', icon: 'TbTestPipe' },
      { name: 'Cypress', icon: 'SiCypress' },
    ],
  },
  {
    id: 'ai',
    skills: [
      { name: 'OpenAI API', icon: 'TbBrandOpenai' },
      { name: 'Claude', icon: 'SiClaude' },
      { name: 'GitHub Copilot', icon: 'SiGithubcopilot' },
    ],
  },
  {
    id: 'other',
    skills: [
      { name: 'Linux', detail: 'Ubuntu', icon: 'SiLinux' },
      { name: 'Swagger', icon: 'SiSwagger' },
      { name: 'Figma', icon: 'SiFigma' },
    ],
  },
];
