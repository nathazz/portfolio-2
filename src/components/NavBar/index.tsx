import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { IstyleProps } from '../../types/types';
import LanguageSelector from '../../i18n/options';
import { SECTIONS } from '../../utils/constants';

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  darkMode: boolean;
  onNavigate: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, activeSection, darkMode, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`overflow-hidden transition-all duration-300 md:hidden ${
        isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div
        className={`border-t backdrop-blur-md ${
          darkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-white/95'
        }`}
      >
        <div className="space-y-1 px-4 py-3">
          {SECTIONS.map(({ id, label }, index) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`block w-full rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                activeSection === id
                  ? 'bg-blue-400 text-white'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
              } ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              }}
            >
              {t(label)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const NavBar: React.FC<IstyleProps> = ({ darkMode, toggleDarkMode, scrollToSection }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    scrollToSection?.(id);
    setIsMobileOpen(false);
  };

  const navBackground =
    activeSection === 'home'
      ? 'bg-transparent border-transparent'
      : darkMode
        ? 'bg-gray-900/90 border-gray-800'
        : 'bg-white/90 border-gray-200';

  return (
    <nav
      className={`fixed top-0 z-50 h-16 w-full border-b backdrop-blur-md transition-all duration-300 ${navBackground}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="bg-blue-400 bg-clip-text text-2xl font-bold text-transparent">
            Nathan&apos;s
          </div>
          <div className="hidden items-center space-x-8 md:flex">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavigate(id)}
                className={`cursor-pointer capitalize transition-colors duration-200 hover:text-blue-400 ${
                  activeSection === id
                    ? 'text-blue-500'
                    : darkMode
                      ? 'text-gray-300'
                      : 'text-gray-600'
                }`}
              >
                {t(label)}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`cursor-pointer rounded-lg p-2 transition hover:scale-110 ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <LanguageSelector darkMode={darkMode} />

            <button
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className={`rounded-lg p-2 transition hover:scale-110 md:hidden ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      <MobileMenu
        isOpen={isMobileOpen}
        activeSection={activeSection}
        darkMode={darkMode}
        onNavigate={handleNavigate}
      />
    </nav>
  );
};

export default NavBar;
