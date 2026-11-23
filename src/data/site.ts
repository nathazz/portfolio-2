import {
  Briefcase01Icon,
  File01Icon,
  GithubIcon,
  Home01Icon,
  Linkedin01Icon,
  Mail01Icon,
  Mail02Icon,
  SourceCodeIcon,
  UserIcon,
  WhatsappIcon,
} from '../lib/icons';
import type { IconSvgElement } from '@hugeicons/react';

export const EMAIL = 'nathas0208@gmail.com';
export const GITHUB_USERNAME = 'nathazz';
export const RESUME_URL =
  'https://drive.google.com/drive/folders/1iyZk7tzUxNuwv0AXRFAcBowORuKGVl9q?usp=sharing';

export const HOME_TIME_ZONE = 'America/Sao_Paulo';

const LINKEDIN_URL = 'https://www.linkedin.com/in/nathasg';

/** Sections of the page, in order. Each one is a window and a dock item. */
export const SECTIONS = [
  { id: 'home', icon: Home01Icon, color: '#5b6478' },
  { id: 'experience', icon: Briefcase01Icon, color: '#1d7fe0' },
  { id: 'skills', icon: SourceCodeIcon, color: '#3aa53a' },
  { id: 'about', icon: UserIcon, color: '#8a4fd8' },
  { id: 'contact', icon: Mail01Icon, color: '#e8862a' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
export const SECTION_IDS = SECTIONS.map((section) => section.id);

interface Shortcut {
  id: string;
  /** Shown as is; when missing, the label comes from the `hero.resume` translation. */
  label?: string;
  icon: IconSvgElement;
  color: string;
  href: (language: string) => string;
}

/** Links out of the site, shown as shortcuts on the desktop. */
export const SHORTCUTS: Shortcut[] = [
  { id: 'resume', icon: File01Icon, color: '#4f7fb8', href: () => RESUME_URL },
  {
    id: 'github',
    label: 'GitHub',
    icon: GithubIcon,
    color: '#2b2f3a',
    href: () => `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin01Icon,
    color: '#0a66c2',
    href: (language) => (language === 'pt' ? `${LINKEDIN_URL}/?locale=pt_BR` : LINKEDIN_URL),
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail02Icon,
    color: '#d8453a',
    href: () => `mailto:${EMAIL}`,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: WhatsappIcon,
    color: '#22b455',
    href: () => 'https://wa.me/+5551993919197',
  },
];
