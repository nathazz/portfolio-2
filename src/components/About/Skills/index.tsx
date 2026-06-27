import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Category, IstyleProps } from '../../../types/types';
import { ALL_SKILLS, CATEGORIES } from '../../../utils/constants';

const SkillsSection: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  return (
    <div>
      <p
        className={`mb-4 text-[18px] font-bold tracking-[0.12em] uppercase ${
          darkMode ? 'text-white' : 'text-gray-400'
        }`}
      >
        {t('about-me.techs')}
      </p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`cursor-pointer rounded-full border px-3 py-1 text-[15px] leading-none font-medium transition-colors ${
                isActive
                  ? darkMode
                    ? 'border-white bg-white text-gray-900'
                    : 'border-gray-900 bg-gray-900 text-white'
                  : darkMode
                    ? 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                    : 'border-gray-400 text-gray-500 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              {t(cat.label)}
            </button>
          );
        })}
      </div>

      <div
        className={`rounded-xl border p-5 ${
          darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <div className="flex flex-wrap gap-1.5">
          {ALL_SKILLS.map((skill) => {
            const match = activeCategory === 'all' || skill.category === activeCategory;

            return (
              <span
                key={skill.name}
                className={`rounded-full border px-4 py-1 text-[16px] transition-opacity duration-150 ${
                  match
                    ? darkMode
                      ? 'border-gray-700 bg-gray-800 text-gray-200 opacity-100'
                      : 'border-gray-200 bg-white text-gray-800 opacity-100'
                    : 'border-transparent bg-transparent opacity-[0.15]'
                }`}
              >
                {skill.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
