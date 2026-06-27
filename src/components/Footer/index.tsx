import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { IstyleProps } from '../../types/types';

const Footer: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  const links = [
    {
      icon: Phone,
      href: 'https://wa.me/+5551993919197',
      label: 'Phone (WhatsApp)',
    },
    {
      icon: Mail,
      href: 'mailto:nathas0208@gmail.com',
      label: 'Email',
    },
    {
      icon: Linkedin,
      href: t('contact.linkedin'),
      label: 'LinkedIn',
    },
    {
      icon: Github,
      href: 'https://github.com/nathazz',
      label: 'GitHub',
    },
  ];

  return (
    <footer
      className={`border-t ${
        darkMode ? 'border-slate-800 bg-[#101828]' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Techs:
            </h3>

            <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              {t('footer.tech')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  darkMode
                    ? 'border-slate-800 text-slate-300 hover:border-blue-500 hover:text-blue-400'
                    : 'border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className={`mt-8 border-t pt-6 text-center text-sm ${
            darkMode ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-500'
          }`}
        >
          © {new Date().getFullYear()} · {t('footer.by')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
