import type { IstyleProps } from '../../types/types';
import { skills } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

const About: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {t('about-me.title')}
          </span>
        </h2>
        <p className={`mx-auto max-w-3xl text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('about-me.text')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              darkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
            }`}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
              <skill.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-center text-xl font-bold">
              {t(`${skill.name.toLowerCase()}`)}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skill.items.map((item, i) => (
                <span
                  key={i}
                  className={`rounded-full px-3 py-1 text-sm ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
