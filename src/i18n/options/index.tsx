import { useTranslation } from 'react-i18next';
import type { IstyleProps } from '../../types/types';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChatTranslateIcon } from '@hugeicons/core-free-icons';

const LanguageSelector: React.FC<IstyleProps> = ({ darkMode }) => {
  const { i18n, t } = useTranslation();

  const handleChange = (value: string) => {
    localStorage.setItem('language', value);
    i18n.changeLanguage(value);
  };

  return (
    <div className="relative inline-block">
      <HugeiconsIcon
        className={`pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2`}
        icon={ChatTranslateIcon}
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
        <option value="pt">{t('options-translate.ptbr')}</option>
        <option value="en">{t('options-translate.en')}</option>
        <option value="es">{t('options-translate.es')}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
