import { Menu, Moon, Sun, X } from 'lucide-react';
import type { IstyleProps } from '../../types/types';
import { useEffect, useState } from 'react';
import { sections } from '../../utils/constants';
import LanguageSelector from '../../i18n/options';
import { useTranslation } from 'react-i18next';

const NavBar: React.FC<IstyleProps> = ({ darkMode, toggleDarkMode, scrollToSection }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (section: string) => {
    scrollToSection?.(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 z-50 h-16 w-full transition-all duration-300 ${
        activeSection === 'home'
          ? darkMode
            ? 'border-transparent bg-transparent'
            : 'border-transparent bg-transparent'
          : darkMode
            ? 'border-gray-800 bg-gray-900/90'
            : 'border-gray-200 bg-white/90'
      } backdrop-blur-md`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
            Nathan's
          </div>

          <div className="hidden space-x-8 md:flex">
            {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection?.(section)}
                className={`cursor-pointer capitalize transition-colors duration-300 hover:text-blue-500 ${
                  activeSection === section
                    ? 'text-blue-500'
                    : darkMode
                      ? 'text-gray-300'
                      : 'text-gray-600'
                }`}
              >
                {section === 'experience'
                  ? t('navbar.xp')
                  : section === 'home'
                    ? t('navbar.home')
                    : section === 'about'
                      ? t('navbar.about')
                      : section === 'projects'
                        ? t('navbar.project')
                        : t('navbar.contacts')}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`cursor-pointer rounded-lg p-2 transition-all duration-300 hover:scale-110 ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <LanguageSelector darkMode={darkMode} />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`rounded-lg p-2 transition-all duration-300 hover:scale-110 md:hidden ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'max-h-70 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`border-t ${
            darkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'
          } backdrop-blur-md`}
        >
          <div className="space-y-1 px-4 py-2">
            {['home', 'about', 'experience', 'projects', 'contact'].map((section, index) => (
              <button
                key={section}
                onClick={() => handleMobileNavClick(section)}
                className={`block w-full transform rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                } ${
                  activeSection === section
                    ? 'bg-blue-500 text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                {section === 'experience'
                  ? 'Experience'
                  : section === 'home'
                    ? 'Home'
                    : section === 'about'
                      ? 'About'
                      : section === 'projects'
                        ? 'Projects'
                        : 'Contact'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
