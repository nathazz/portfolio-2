import { useState } from 'react';
import type { IstyleProps } from '../../types/types';
import { useTranslation } from 'react-i18next';
import { renderDescription } from './RenderDescription';

const Experience: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const jobs = t('experience.jobs', { returnObjects: true }) as {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    stack?: string[];
  }[];

  const activeJob = jobs[activeIndex];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-14 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className={darkMode ? 'text-white' : 'text-gray-900'}>{t('experience.title')}</span>
        </h2>
        <p className={`mx-auto max-w-2xl text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('experience.description')}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <div
          className={`flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible lg:border-l ${
            darkMode ? 'lg:border-gray-800' : 'lg:border-gray-200'
          }`}
        >
          {jobs.map((job, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={job.company}
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 cursor-pointer px-4 py-3 text-left transition-colors duration-150 lg:-ml-px lg:border-l-2 lg:px-5 ${
                  isActive
                    ? darkMode
                      ? 'border-blue-500 bg-gray-800/60 text-white'
                      : 'border-blue-500 bg-blue-50/60 text-gray-900'
                    : darkMode
                      ? 'border-transparent text-gray-500 hover:bg-gray-800/30 hover:text-gray-300'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <p className="text-sm font-semibold whitespace-nowrap">{job.company}</p>
                <p
                  className={`mt-0.5 text-xs whitespace-nowrap ${
                    isActive
                      ? darkMode
                        ? 'text-gray-300'
                        : 'text-gray-600'
                      : darkMode
                        ? 'text-gray-600'
                        : 'text-gray-400'
                  }`}
                >
                  {job.period}
                </p>
              </button>
            );
          })}
        </div>

        <div key={activeIndex} className="animate-in fade-in min-w-0 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-2xl font-semibold">{activeJob.role}</h3>
            <span className="mt-1 text-sm text-blue-500 sm:mt-0">{activeJob.period}</span>
          </div>
          <p className="mt-1 text-sm font-medium text-blue-400">{activeJob.company}</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {activeJob.location}
          </p>

          <div className={`mt-5 space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {renderDescription(activeJob.description)}
          </div>

          {activeJob.stack && (
            <div className="mt-5 flex flex-wrap gap-2">
              {activeJob.stack.map((tech, i) => (
                <span
                  key={i}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                    darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
