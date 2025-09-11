import { useTranslation } from 'react-i18next';
import type { IstyleProps } from '../../types/types';

const LanguageSelector: React.FC<IstyleProps> = ({ darkMode }) => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    localStorage.setItem('language', value);
    i18n.changeLanguage(value);
  };

  return (
    <div>
      <select
        onChange={(e) => handleChange(e.target.value)}
        value={i18n.language}
        className={`cursor-pointer rounded-lg px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          darkMode
            ? 'border-gray-600 bg-gray-800 text-gray-200'
            : 'border-gray-300 bg-white text-gray-700'
        }`}
      >
        <option value="pt">PTBR</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
