import { Code, Palette, Zap } from 'lucide-react';
import logoScraper from '/assets/images/banners/logoScraper.png';
import logoMedTime from '/assets/images/banners/medtime.svg';
import logoJob from '/assets/images/banners/where_is_job.svg';
import logoEtherWatch from '/assets/images/banners/etherWatch.png';
import logoPortfolio1 from '/assets/images/banners/user.png';
import logoPwaNotes from '/assets/images/banners/logoPwa.png';

export const sections = ['home', 'about', 'projects', 'experience', 'contact'];

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
      'Java (Spring Boot)',
      'SQl',
      'NoSQL',
      'RabbitMQ',
      'Tests',
      'AWS',
    ],
  },
  {
    name: 'Others',
    icon: Palette,
    items: [
      'Figma',
      'Docker',
      'Git/Github/Git Actions',
      'Auth',
      'AI',
      'Linux',
      "Orm's",
      'Redis',
      'Swagger',
    ],
  },
];

export const images: Record<number, string> = {
  994994606: logoEtherWatch,
  1028620732: logoPwaNotes,
  978289300: logoScraper,
  1005165341: logoEtherWatch,
  687245167: logoMedTime,
  736647382: logoPortfolio1,
  620526289: logoJob,
};

export const GITHUB_USERNAME = 'nathazz';
