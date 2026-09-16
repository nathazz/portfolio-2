import { useTranslation } from 'react-i18next';

const PhraseCard = ({ darkMode }: { darkMode: boolean }) => {
  const { t } = useTranslation();

  return (
    <div className="relative mb-14 h-[190px] overflow-hidden rounded-xl">
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
    </div>
  );
};

export default PhraseCard;
