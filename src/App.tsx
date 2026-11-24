import { useTranslation } from 'react-i18next';
import { Backdrop } from './components/layout/Backdrop';
import { Dock } from './components/layout/Dock';
import { Footer } from './components/layout/Footer';
import { MenuBar } from './components/layout/MenuBar';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Penguin } from './components/ui/Penguin';

export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <a href="#main" className="btn btn--raised skip-link">
        {t('a11y.skipToContent')}
      </a>
      <Backdrop />
      <MenuBar />
      <main id="main">
        <Hero />
        <div className="page-width gap-fluid-l py-fluid-l @container grid">
          <Experience />
          <Skills />
          <About />
          <Contact />
        </div>
      </main>
      <Footer />
      <Penguin />
      <Dock />
    </>
  );
}
