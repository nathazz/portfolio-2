import { useTranslation } from 'react-i18next';

const PhraseCard = ({ darkMode }: { darkMode: boolean }) => {
  const { t } = useTranslation();

  return (
    <div className="relative mb-14 h-[190px] overflow-hidden rounded-3xl">
      <div
        className={`absolute inset-0 ${
          darkMode
            ? 'bg-gradient-to-b from-[#0a0f1e] via-[#0f2a5c] to-[#2a5298]'
            : 'bg-gradient-to-b from-blue-200 via-blue-400 to-blue-500'
        }`}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.15),_transparent_60%)]" />

      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-10">
        <p className="text-center text-2xl leading-snug font-bold text-white drop-shadow-lg sm:text-3xl lg:text-3xl">
          {t('faq.phrase')}
        </p>
      </div>

      <div
        className={`absolute right-6 bottom-6 flex h-11 w-11 animate-bounce items-center justify-center rounded-full shadow-lg ${
          darkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
};

export default PhraseCard;
