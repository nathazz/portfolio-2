import React, { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { IstyleProps } from '../../types/types';
import { getRepos, type IRepoResponse } from '../../services/github';
import { customRepoData, images } from '../../utils/constants';
import { formatRepoName } from '../../utils/formatName';

const Projects: React.FC<IstyleProps> = ({ darkMode }) => {
  const [repos, setRepos] = useState<IRepoResponse[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await getRepos();
        setRepos(res);
      } catch (err) {
        console.error('Error to search repos', err);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, index) => {
          const custom = customRepoData[repo.id] || {};

          const description = custom.description || repo.description || 'No description provided.';
          const link = custom.homepage || repo.homepage || '';
          const topics = custom.topics || repo.topics || [];

          return (
            <div
              key={index}
              className={`group overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                darkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
              }`}
            >
              <div className="flex flex-col items-center overflow-hidden">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={images[repo.id] || '/images/default.png'}
                    alt={repo.name}
                    className="h-full w-full object-contain p-4 transition-transform duration-300 ease-in-out will-change-transform group-hover:scale-105"
                  />
                </div>

                <h3
                  className={`mt-4 px-4 text-center text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {formatRepoName(repo.name)}
                </h3>
              </div>

              <div className="p-6">
                <p
                  className={`mb-4 text-sm leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {description}
                </p>

                {topics.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
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

                <div className="flex gap-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {link.includes('drive.google.com') ? 'APK' : 'Live'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
