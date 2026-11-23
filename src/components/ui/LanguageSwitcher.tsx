import { useTranslation } from 'react-i18next';
import { changeLanguage, LANGUAGES } from '../../i18n';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <div className="segmented" role="group" aria-label={t('language.label')}>
      {LANGUAGES.map(({ code, name }) => (
        <button
          key={code}
          type="button"
          lang={code}
          title={name}
          aria-label={name}
          aria-pressed={i18n.resolvedLanguage === code}
          onClick={() => changeLanguage(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
