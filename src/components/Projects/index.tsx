import type React from 'react';
import type { IstyleProps } from '../../types/types';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../utils/constants';

const Projects: React.FC<IstyleProps> = ({ darkMode }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className={`mx-auto max-w-3xl text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          A selection of my most recent projects, demonstrating different technologies and
          development approaches.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`group overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
              darkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
            }`}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-contain p-4 transition-transform duration-300 ease-in-out will-change-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>

            <div className="p-6">
              <h3 className="mb-3 text-xl font-bold">{project.title}</h3>
              <p
                className={`mb-4 text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {project.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
                <a
                  href={project.live || project.Apk}
                  target="_blank"
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4" />
                  {project.live ? 'Live' : 'Apk'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
