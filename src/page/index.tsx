import { useState } from 'react';
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import About from '../components/About';
import Projects from '../components/Projects';
import Contacts from '../components/Contact';
import Experience from '../components/Experience';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
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

      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <About darkMode={darkMode} />
      </section>

      <section id="experience" className={`py-20 ${darkMode ? 'bg-gray-800/45' : 'bg-white'}`}>
        <Experience darkMode={darkMode} />
      </section>

      <section id="projects" className="py-20">
        <Projects darkMode={darkMode} />
      </section>

      <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <Contacts darkMode={darkMode} />
      </section>

      <footer
        className={`border-t py-8 ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              © 2025 Portfolio. Developed by Nathan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
