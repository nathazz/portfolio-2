import type { IstyleProps } from '../../types/types';
import { useTranslation } from 'react-i18next';
import Avatar from './Avatar';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon, Download02Icon } from '@hugeicons/core-free-icons';

const Home: React.FC<IstyleProps> = ({ darkMode, scrollToSection }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 ${darkMode ? 'opacity-20' : 'opacity-10'}`}
          style={{
            backgroundImage: `
              linear-gradient(${darkMode ? 'rgba(0, 98, 255, 0.315)' : 'rgba(59, 131, 246, 0.863)'} 1px, transparent 1px),
              linear-gradient(90deg, ${darkMode ? 'rgba(59, 131, 246, 0.342)' : 'rgba(59, 131, 246, 0.829)'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex flex-col items-center space-y-10 text-center">
            <div className="relative order-1">
              <div
                className={`absolute inset-0 -z-10 rounded-full blur-2xl ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-400/25'
                }`}
              />

              <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64">
                <div
                  className={`h-full w-full overflow-hidden rounded-full border-2 shadow-xl ${
                    darkMode ? 'border-gray-800 shadow-black/40' : 'border-white shadow-gray-300/50'
                  }`}
                >
                  <Avatar />
                </div>
              </div>
            </div>

            <div className="order-2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl leading-tight font-black sm:text-3xl md:text-5xl">
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {t('title.first')}{' '}
                  </span>
                  <span className="text-blue-400">{t('title.second')}</span>
                </h1>

                <p
                  className={`mx-auto max-w-2xl text-base sm:text-lg md:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {t('subtitle')}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => scrollToSection?.('projects')}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl px-8 py-4 font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('links-home.see-projects')}
                    <HugeiconsIcon
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      icon={ArrowRight02Icon}
                    />
                  </span>
                </button>

                <a
                  href="https://drive.google.com/drive/folders/1iyZk7tzUxNuwv0AXRFAcBowORuKGVl9q?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-xl border-2 px-8 py-4 font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon className="h-5 w-5" icon={Download02Icon} />
                    {t('links-home.download-cv')}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
