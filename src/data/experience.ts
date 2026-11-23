export type YearMonth = `${number}-${number}`;

export interface Job {
  id: 'minha-crc' | 'nexa-roofing' | 'scoremilk' | 'sollydus';
  company: string;
  start: YearMonth | null;
  end: YearMonth | null;
  stack: string[];
}

export interface JobCopy {
  role: string;
  location: string;
  summary: string;
  groups: { title: string; items: string[] }[];
}

export const JOBS: Job[] = [
  {
    id: 'minha-crc',
    company: 'Minha CRC',
    start: null,
    end: null,
    stack: [],
  },
  {
    id: 'nexa-roofing',
    company: 'Nexa Roofing',
    start: '2025-11',
    end: '2026-03',
    stack: [
      'N8N',
      'JavaScript',
      'Python',
      'Glide',
      'OpenAI',
      'Automation Engineering',
      'Webhooks',
      'Airtable',
    ],
  },
  {
    id: 'scoremilk',
    company: 'ScoreMilk',
    start: '2024-07',
    end: '2025-06',
    stack: [
      'React.js',
      'REST',
      'Blockchain/Web3',
      'Ethers.js',
      'MetaMask',
      'Node.js',
      'TypeScript',
      'Golang',
      'PostgreSQL',
      'AWS',
      'Redis',
    ],
  },
  {
    id: 'sollydus',
    company: 'Sollydus',
    start: '2023-04',
    end: '2024-03',
    stack: [
      'REST',
      'Node.js',
      'React.js',
      'TypeScript',
      'RabbitMQ',
      'PostgreSQL',
      'System Design',
      'AWS',
      'Python',
      'Redis',
      'Linux',
    ],
  },
];

export const CURRENT_JOB = JOBS.find((job) => job.end === null);
