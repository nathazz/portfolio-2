import { useState } from 'react';
import type { IstyleProps } from '../../types/types';
import { useTranslation } from 'react-i18next';

const Experience: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const jobs = t('experience.jobs', { returnObjects: true }) as {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    stack?: string[];
  }[];

  const visibleExperiences = showAll ? jobs : jobs.slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {t('experience.title')}
          </span>
        </h2>
        <p
          className={`mx-auto max-w-2xl text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {t('experience.description')}
        </p>
      </div>

      <div className="space-y-8">
        {visibleExperiences.map((exp, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 shadow-md transition-all ${
              darkMode
                ? 'border border-gray-700 bg-gray-800'
                : 'border border-gray-200 bg-white'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-2xl font-semibold">{exp.role}</h3>
              <span className="mt-1 text-sm text-blue-500 sm:mt-0">
                {exp.period}
              </span>
            </div>
            <p className="text-sm font-medium text-blue-400">{exp.company}</p>
            <p
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {exp.location}
            </p>

            <p
              className={`mt-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {exp.description}
            </p>

            {exp.stack && (
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.stack.map((tech, i) => (
                  <span
                    key={i}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      darkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {jobs.length > 2 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2 text-sm font-medium text-white shadow-md transition-all hover:scale-105"
          >
            {showAll ? t('experience.show-less') : t('experience.show-more')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Experience;
