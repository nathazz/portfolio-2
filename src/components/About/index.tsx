import { useTranslation } from 'react-i18next';
import type React from 'react';
import SkillsSection from './Skills';
import { Earth } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-20">
      <div
        className={`mb-10 flex items-baseline justify-center border-b pb-5 ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        <h2
          className={`col-end-1 text-[32px] leading-none font-bold tracking-tight lg:text-[40px] ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {t('about-me.title')}
        </h2>
      </div>

      <div className="w-full lg:max-w-5xl xl:max-w-[1100px]">
        <p
          className={`mb-5 text-[22px] leading-[1.4] font-semibold lg:text-[26px] ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          {t('about-me.pull-quote')}
        </p>

        <p
          className={`border-l-2 pl-4 text-[17px] leading-[1.75] ${
            darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-600'
          }`}
          style={{ borderRadius: 0 }}
        >
          {t('about-me.text')}
        </p>

        <div
          className={`mt-5 flex items-center gap-3 rounded-xl border p-3.5 ${
            darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <Earth className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <div>
            <p
              className={`text-[13px] leading-snug ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {t('about-me.location')}
            </p>
            <p className={`mt-0.5 text-[13px] text-red-500`}>{t('about-me.availability')}</p>
          </div>
        </div>
      </div>

      <hr className={`my-9 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`} />

      <SkillsSection darkMode={darkMode} />
    </section>
  );
};

export default About;
