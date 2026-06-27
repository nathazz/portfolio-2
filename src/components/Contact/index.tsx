import { useTranslation } from 'react-i18next';
import type { IstyleProps } from '../../types/types';
import Faq from './FAQ';
import SendEmail from './SendEmail';
import PhraseCard from './PhraseCard';

const Contacts: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className={darkMode ? 'text-white' : 'text-gray-900'}>{t('contact.title')}</span>
        </h2>
      </div>
      <div className="mx-auto grid max-w-7xl gap-15 lg:grid-cols-[1.1fr_.9fr]">
        <div className="order-2 lg:order-1">
          <PhraseCard darkMode={darkMode} />
          <Faq darkMode={darkMode} />
        </div>

        <div className="order-1 lg:order-2">
          <SendEmail darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
