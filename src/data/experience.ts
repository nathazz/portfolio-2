/** A calendar month, e.g. '2024-07'. */
export type YearMonth = `${number}-${number}`;

/**
 * Language-independent facts about a job. The translated copy (role,
 * location, summary, highlights) lives in the locale files under
 * `experience.jobs.<id>` and follows the JobCopy shape below.
 */
export interface Job {
  id: 'minha-crc' | 'nexa-roofing' | 'scoremilk' | 'sollydus';
  company: string;
  /** null while the start month is not filled in yet. */
  start: YearMonth | null;
  /** null means the job is ongoing. */
  end: YearMonth | null;
  stack: string[];
}

export interface JobCopy {
  role: string;
  location: string;
  summary: string;
  groups: { title: string; items: string[] }[];
}

/** Newest first. */
export const JOBS: Job[] = [
  {
    id: 'minha-crc',
    company: 'Minha CRC',
    // TODO: fill in the start month and stack, plus role/location/summary in the locale files.
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
