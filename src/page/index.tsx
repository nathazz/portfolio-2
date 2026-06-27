import { useState } from 'react';
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contacts from '../components/Contact';
import Footer from '../components/Footer';

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

      <section
        id="about"
        className={`py-20 ${darkMode ? 'bg-[color-mix(in_oklab,_oklch(0.3_0.04_256.8)_50%,_transparent)]' : 'bg-gray-50'}`}
      >
        <About darkMode={darkMode} />
      </section>

      <section
        id="experience"
        className={`py-20 ${darkMode ? 'bg-[color-mix(in_oklab,_oklch(0.3_0.04_256.8)_50%,_transparent)]' : 'bg-gray-50'}`}
      >
        <Experience darkMode={darkMode} />
      </section>

      <section id="projects" className="py-20">
        <Projects darkMode={darkMode} />
      </section>

      <section id="contact" className={`py-20 ${darkMode ? 'bg-[#192335]' : 'bg-gray-50'}`}>
        <Contacts darkMode={darkMode} />
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Portfolio;
