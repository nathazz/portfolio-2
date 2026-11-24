import { useTranslation } from 'react-i18next';
import { usePenguin } from '../../hooks/usePenguin';

export function Penguin() {
  const { t } = useTranslation();
  const ref = usePenguin();

  return (
    <button ref={ref} type="button" className="penguin" aria-label={t('a11y.petPenguin')}>
      <span className="penguin__body">
        <span className="penguin__sprite" />
      </span>
    </button>
  );
}
