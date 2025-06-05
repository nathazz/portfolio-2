import { ArrowRight, Download } from 'lucide-react';
import type { IstyleProps } from '../../types/types';
import logoMe from '/assets/images/icon/me.jpg';

const Home: React.FC<IstyleProps> = ({ darkMode, scrollToSection }) => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-transparent"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6">
            <div className="mx-auto h-64 w-64 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-lg">
              <div
                className={`h-full w-full overflow-hidden rounded-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              >
                <img
                  src={logoMe}
                  alt="My profile"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <h1 className="mb-5 text-5xl leading-tight font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Software <span className={darkMode ? 'text-white' : 'text-gray-900'}>Developer</span>
            </span>
          </h1>
          <p
            className={`md:text-1xl mx-auto mb-8 max-w-3xl text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Building intelligent, scalable software solutions. Turning complex challenges into
            efficient, high-performance applications
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => scrollToSection?.('projects')}
              className="group flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              View Projects
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              className={`flex cursor-pointer items-center gap-2 rounded-full border-2 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              <Download className="h-5 w-5" />
              Download CV
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-blue-500/20 blur-xl"></div>
      <div className="absolute right-10 bottom-20 h-32 w-32 animate-pulse rounded-full bg-cyan-500/20 blur-xl delay-1000"></div>
    </>
  );
};

export default Home;
