import { useTranslation } from 'react-i18next';
import { skills } from '../../utils/constants';
import type React from 'react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-20">
      <div className="relative mb-14 h-[320px] overflow-hidden rounded-3xl">
        <div
          className={`absolute inset-0 ${
            darkMode
              ? 'bg-gradient-to-b from-[#0a0f1e] via-[#0f2a5c] to-[#2a5298]'
              : 'bg-gradient-to-b from-blue-200 via-blue-400 to-blue-500'
          }`}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.15),_transparent_60%)]" />

        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-white opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
            />
          ))}
        </div>

        <div
          className={`absolute top-6 left-6 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase ${
            darkMode ? 'bg-white/10 text-white' : 'bg-white/40 text-blue-900'
          }`}
        >
          {t('about-me.title')}
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-10">
          <p className="text-center text-2xl leading-snug font-bold text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
            {t('about-me.hero-phrase')}
          </p>
        </div>

        <div
          className={`absolute right-6 bottom-6 flex h-11 w-11 animate-bounce items-center justify-center rounded-full shadow-lg ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <p
            className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            {t('about-me.text')}
          </p>
        </div>

        <div
          className={`rounded-3xl border p-8 shadow-sm ${
            darkMode
              ? 'border-gray-800 bg-gray-900 text-white'
              : 'border-gray-200 bg-white text-gray-900'
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <span
              className={`text-xs font-semibold tracking-widest uppercase ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {t('about-me.techs')}
            </span>
          </div>

          <div className={`mb-5 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`} />

          <div className="space-y-4">
            {skills.map(({ name, items }) => (
              <div key={name}>
                <span
                  className={`mb-2 block text-xs font-semibold tracking-widest uppercase ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {name}
                </span>

                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        darkMode
                          ? 'border border-gray-700 bg-gray-800 text-gray-300'
                          : 'border border-gray-200 bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
