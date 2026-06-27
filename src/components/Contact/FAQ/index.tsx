import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Code2, Globe, ShieldCheck, FileText, Languages, Contact } from 'lucide-react';
import type { IstyleProps } from '../../../types/types';

interface FaqItem {
  icon: React.ComponentType<{ className?: string }>;
  question: string;
  answer: string;
}

const Faq: React.FC<IstyleProps> = ({ darkMode }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: FaqItem[] = [
    { icon: Code2, question: t('faq.q1.q'), answer: t('faq.q1.a') },
    { icon: Contact, question: t('faq.q2.q'), answer: t('faq.q2.a') },
    { icon: Globe, question: t('faq.q3.q'), answer: t('faq.q3.a') },
    { icon: ShieldCheck, question: t('faq.q4.q'), answer: t('faq.q4.a') },
    { icon: FileText, question: t('faq.q5.q'), answer: t('faq.q5.a') },
    { icon: Languages, question: t('faq.q6.q'), answer: t('faq.q6.a') },
  ];

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-transparent`}>
      <div role="list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <div
              key={index}
              role="listitem"
              className={`border-b last:border-b-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-inset ${
                  darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}
                  />
                  <span className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {item.question}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  } ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid overflow-hidden transition-all duration-300 ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`px-6 pb-5 pl-14 text-sm leading-relaxed ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
