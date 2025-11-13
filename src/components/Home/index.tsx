import { ArrowRight, Download, Terminal } from 'lucide-react';
import type { IstyleProps } from '../../types/types';
import { useEffect, useState } from 'react';
import { getAvatar, type IAvatarResponse } from '../../services/github';
import { useTranslation } from 'react-i18next';

const Home: React.FC<IstyleProps> = ({ darkMode, scrollToSection }) => {
  const [avatar, setAvatar] = useState<IAvatarResponse>();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await getAvatar();
        setAvatar(res);
      } catch (err) {
        console.error('Error to get avatar', err);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 ${darkMode ? 'opacity-20' : 'opacity-10'}`}
          style={{
            backgroundImage: `
              linear-gradient(${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
              linear-gradient(90deg, ${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex flex-col items-center space-y-10 text-center">
            <div className="relative order-1">
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64">
                <div className="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>
                <div
                  className={`absolute inset-1 rounded-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                ></div>
                <div className="absolute inset-2 overflow-hidden rounded-full">
                  <img
                    src={avatar?.avatar_url}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div
                className={`absolute -top-2 -right-2 h-4 w-4 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} animate-ping`}
              ></div>
              <div
                className={`absolute -bottom-2 -left-2 h-3 w-3 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'} animate-ping`}
                style={{ animationDelay: '1s' }}
              ></div>
            </div>

            <div className="order-2 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-px w-8 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                  <span
                    className={`font-mono text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    developer.init()
                  </span>
                  <div className={`h-px w-8 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                </div>

                <h1 className="text-5xl leading-none font-black sm:text-1xl md:text-4xl lg:text-5xl">
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {t('title.first')}{' '}
                  </span>
                  <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    {t('title.second')}
                  </span>
                </h1>

                <p
                  className={`mx-auto max-w-2xl text-base sm:text-lg md:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {t('subtitle')}
                </p>
              </div>

              <div
                className={`inline-flex items-center gap-3 rounded-full border px-6 py-3 ${darkMode ? 'border-gray-800 bg-gray-900/50 backdrop-blur-sm' : 'border-gray-200 bg-white/50 backdrop-blur-sm'}`}
              >
                <Terminal className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <code
                  className={`font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  <span className={darkMode ? 'text-purple-400' : 'text-purple-600'}>const</span>{' '}
                  {t('terminal.welcome')}: string[] = [
                  <span className={darkMode ? 'text-green-400' : 'text-green-600'}>
                    '{t('terminal.first')}'
                  </span>
                  ,
                  <span className={darkMode ? 'text-green-400' : 'text-green-600'}>
                    '{t('terminal.second')}'
                  </span>
                  ];
                </code>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => scrollToSection?.('projects')}
                  className={`group relative cursor-pointer overflow-hidden rounded-full px-8 py-4 font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('links-home.see-projects')}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                <a
                  href="https://drive.google.com/drive/folders/1iyZk7tzUxNuwv0AXRFAcBowORuKGVl9q?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-full border-2 px-8 py-4 font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
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
