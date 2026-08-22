import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Category, IstyleProps } from '../../../types/types';
import { ALL_SKILLS, CATEGORIES } from '../../../utils/constants';

const SkillsSection: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-20">
      <div className="mb-8 text-center">
        <h2
          className={`text-4xl font-bold md:text-5xl ${darkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {t('about-me.techs')}
        </h2>
      </div>

      <div
        className={`mb-6 flex flex-wrap justify-center gap-6 border-b pb-0 ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative cursor-pointer pb-3 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? darkMode
                    ? 'text-white'
                    : 'text-gray-900'
                  : darkMode
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {t(cat.label)}
              <span
                className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full transition-opacity duration-150 ${
                  isActive ? 'bg-blue-500 opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {ALL_SKILLS.map((skill) => {
          const match = activeCategory === 'all' || skill.category === activeCategory;

          return (
            <span
              key={skill.name}
              className={`rounded-md border px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
                match
                  ? darkMode
                    ? 'border-gray-700 bg-gray-800 text-gray-200 opacity-100'
                    : 'border-gray-200 bg-gray-50 text-gray-700 opacity-100'
                  : 'border-transparent opacity-0'
              }`}
              style={!match ? { position: 'absolute', pointerEvents: 'none' } : undefined}
            >
              {skill.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
