import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { skills } from '../../utils/constants';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2
          className={`mb-12 text-center text-4xl font-bold sm:text-5xl ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {t('about-me.title')}
        </h2>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <div className="space-y-6 text-lg leading-relaxed">
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{t('about-me.text')}</p>
          </div>

          <div className="space-y-8">
            {skills.map(({ name, icon: Icon, items }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-[1.5px] ${
                  darkMode
                    ? 'bg-gradient-to-r bg-cyan-300/30'
                    : 'bg-gradient-to-r from-cyan-500/10 to-cyan-600/10'
                }`}
              >
                <div
                  className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900' : 'bg-white shadow-sm'}`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Icon size={22} className={darkMode ? 'text-cyan-400' : 'text-cyan-600'} />
                    <h3
                      className={`text-xl font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {name}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <li
                        key={tech}
                        className={`rounded-full border px-3 py-1 text-sm font-medium ${
                          darkMode
                            ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                        } transition-colors duration-200`}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
