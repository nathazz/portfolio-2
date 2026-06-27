import type { CATEGORIES } from '../utils/constants';

export type IstyleProps = {
  darkMode: boolean;
  toggleDarkMode?: () => void;
  scrollToSection?: (section: string) => void;
  activeSection?: string;
};

export type Category = (typeof CATEGORIES)[number]['id'];

export interface Skill {
  name: string;
  category: Exclude<Category, 'all'>;
}
