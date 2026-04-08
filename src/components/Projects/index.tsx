import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Github, ExternalLink } from 'lucide-react';
import type { IstyleProps } from '../../types/types';
import { useTranslation } from 'react-i18next';

const Projects: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  const projects = t('projects.items', { returnObjects: true }) as {
    title: string;
    description: string;
    image?: string;
    git: string;
    link: string;
  }[];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className={darkMode ? 'text-white' : 'text-gray-900'}>{t('projects.title')}</span>
        </h2>
      </div>

      <span
        className={`animate-pulse text-base font-medium tracking-wide ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        ← {t('projects.swipe')} →
      </span>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="flex h-auto">
            <div
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
              }`}
            >
              <div
                className={`relative flex h-40 w-full items-center justify-center ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <img
                  src={project.image || '/images/projects/default.png'}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <h3
                  className={`mb-3 text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`mb-6 text-sm leading-relaxed ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {project.description}
                </p>
                <div className="mt-auto flex gap-3">
                  <a
                    href={project.git}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
                      darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Github className="h-4 w-4" />
                    {t('links-project.code')}
                  </a>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
                        darkMode
                          ? 'bg-white text-gray-900 hover:bg-gray-200'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t('links-project.live')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-10 text-center">
        <a
          href="https://github.com/nathazz"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-medium underline underline-offset-4 transition ${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('projects.footer')}
        </a>
      </div>
    </div>
  );
};

export default Projects;
