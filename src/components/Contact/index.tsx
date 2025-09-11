import { Github, Linkedin, Mail } from 'lucide-react';
import type { IstyleProps } from '../../types/types';
import SendEmail from './sendEmail';
import { useTranslation } from 'react-i18next';

const Contacts: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {t("contact.title")}
          </span>
        </h2>
        <p className={`mx-auto max-w-3xl text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
         {t("contact.text")}
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Mail,
              label: 'Email',
              value: 'nathas0208@gmail.com',
              href: 'mailto:nathas0208@gmail.com',
            },
            {
              icon: Linkedin,
              label: 'LinkedIn',
              value: '/nathasg',
              href: 'https://www.linkedin.com/in/nathasg',
            },
            {
              icon: Github,
              label: 'GitHub',
              value: '/nathazz',
              href: 'https://github.com/nathazz',
            },
          ].map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              className={`group flex flex-col items-center rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                darkMode
                  ? 'border border-gray-700 bg-gray-800 hover:border-gray-600'
                  : 'border border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 transition-transform group-hover:scale-110">
                <contact.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-1 font-semibold">{contact.label}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {contact.value}
              </p>
            </a>
          ))}
        </div>
        <SendEmail darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Contacts;
