import { useTranslation } from 'react-i18next';
import { Window } from './Window';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="page-width pb-28">
      <Window
        id="readme"
        title={t('footer.title')}
        className="mx-auto max-w-[36rem]"
        status={`© ${new Date().getFullYear()} · ${t('footer.by')}`}
      >
        <p className="text-fluid-xl font-bold">{t('footer.phrase')}</p>
        <p className="text-fluid-sm text-ink-soft mt-fluid-2xs">{t('footer.tech')}</p>
      </Window>
    </footer>
  );
}
