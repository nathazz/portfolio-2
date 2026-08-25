import { lazy, Suspense, useState } from 'react';
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import About from '../components/About';
import Experience from '../components/Experience';
import Contacts from '../components/Contact';
import Footer from '../components/Footer';

const Portfolio = () => {
  const SkillsSection = lazy(() => import('../components/About/Skills'));
  const Projects = lazy(() => import('../components/Projects'));

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'text-white' : 'bg-white text-gray-900'
      }`}
      style={
        darkMode
          ? {
              background:
                'linear-gradient(to bottom, #1e2536 0%, #171d2c 25%, #12161f 50%, #10141d 75%, #14192a 100%)',
            }
          : undefined
      }
    >
      <NavBar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        scrollToSection={scrollToSection}
      />

      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <Home darkMode={darkMode} scrollToSection={scrollToSection} />
      </section>

      <section
        id="about"
        className={`border-t py-24 ${darkMode ? 'border-white/5' : 'border-gray-100 bg-white'}`}
      >
        <About darkMode={darkMode} />
      </section>

      <section
        id="skills"
        className={`border-t py-24 ${darkMode ? 'border-white/5' : 'border-gray-100 bg-gray-50'}`}
      >
        <Suspense
          fallback={
            <div
              className={`flex min-h-[300px] items-center justify-center text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Loading skills...
            </div>
          }
        >
          <SkillsSection darkMode={darkMode} />
        </Suspense>
      </section>

      <section
        id="experience"
        className={`border-t py-24 ${darkMode ? 'border-white/5' : 'border-gray-100 bg-white'}`}
      >
        <Experience darkMode={darkMode} />
      </section>

      <section
        id="projects"
        className={`border-t py-24 ${darkMode ? 'border-white/5' : 'border-gray-100 bg-gray-50'}`}
      >
        <Suspense
          fallback={
            <div
              className={`flex min-h-[300px] items-center justify-center text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Loading projects...
            </div>
          }
        >
          <Projects darkMode={darkMode} />
        </Suspense>
      </section>

      <section
        id="contact"
        className={`border-t py-24 ${darkMode ? 'border-white/5' : 'border-gray-100 bg-gray-50'}`}
      >
        <Contacts darkMode={darkMode} />
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Portfolio;
