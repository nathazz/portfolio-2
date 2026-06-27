import { useTranslation } from 'react-i18next';
import type { IstyleProps } from '../../types/types';
import { Languages } from 'lucide-react';

const LanguageSelector: React.FC<IstyleProps> = ({ darkMode }) => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    localStorage.setItem('language', value);
    i18n.changeLanguage(value);
  };

  return (
    <div className="relative inline-block">
      <Languages
        className={`pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
      />

      <select
        onChange={(e) => handleChange(e.target.value)}
        value={i18n.language}
        className={`w-full cursor-pointer appearance-none rounded-lg border py-2 pr-8 pl-10 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          darkMode
            ? 'border-none bg-gray-800 text-gray-200'
            : 'border-gray-300 bg-white text-gray-700'
        }`}
      >
        <option value="pt">PT-BR</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
