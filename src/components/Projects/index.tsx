import React, { useEffect, useState } from 'react';
import 'swiper/css';
import './swiperCss/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ExternalLink, Github } from 'lucide-react';
import { getRepos, type IRepoResponse } from '../../services/github';
import { images } from '../../utils/constants';
import { formatRepoName } from '../../utils/formatName';
import type { IstyleProps } from '../../types/types';
import { useTranslation } from 'react-i18next';

const Projects: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t, i18n } = useTranslation();
  const [repos, setRepos] = useState<IRepoResponse[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await getRepos();
        setRepos(res);
      } catch (err) {
        console.error('Error fetching repos', err);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {t('projects.title')}
          </span>
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {repos.map((repo) => {
          const { language } = i18n;

          const projectsFromJSON = t('projects.items', { returnObjects: true }) as {
            title: string;
            description: string;
            match: string;
          }[];

          const projectJSON = projectsFromJSON.find(
            (p) => p.match.toLowerCase() === repo.name.toLowerCase(),
          );

          const description =
            projectJSON?.description ||
            (language === 'en' ? 'No description provided.' : 'Descrição não disponível.');

          const link = repo.homepage || '';
          const topics = repo.topics || [];

          return (
            <SwiperSlide key={repo.id} className="flex h-auto">
              <div
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-2xl ${
                  darkMode ? 'border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                      src={images[repo.id] || '/images/default.png'}
                      alt={repo.name}
                      className="max-h-full max-w-full object-contain p-4 select-none"
                    />
                  </div>
                  <h3
                    className={`mt-4 px-4 text-center text-xl font-bold select-none ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {formatRepoName(repo.name)}
                  </h3>
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <p
                    className={`mb-4 text-sm leading-relaxed select-none ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {description}
                  </p>

                  {topics.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2 select-none">
                      {repo.language && (
                        <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs text-white">
                          {repo.language}
                        </span>
                      )}
                      {topics.map((topic, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs text-white"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex gap-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors select-none ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Github className="h-4 w-4" />
                      {t('links-project.code')}
                    </a>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition-transform select-none hover:scale-105"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {link.includes('drive.google.com')
                          ? t('links-project.apk')
                          : t('links-project.live')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Projects;
