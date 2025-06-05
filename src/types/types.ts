export type IstyleProps = {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
  scrollToSection?: (section: string) => void;
  activeSection?: string;
};