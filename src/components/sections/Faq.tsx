import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslation } from 'react-i18next';
import { FAQ } from '../../data/faq';

/**
 * Native <details> elements sharing a name behave as an accordion (opening
 * one closes the others), with keyboard and screen-reader support built in.
 */
export function Faq() {
  const { t } = useTranslation();

  return (
    <div className="faq">
      {FAQ.map(({ id, icon }) => (
        <details key={id} name="faq">
          <summary>
            <HugeiconsIcon icon={icon} aria-hidden="true" />
            {t(`faq.items.${id}.q`)}
            <HugeiconsIcon icon={ArrowDown01Icon} className="faq__chevron" aria-hidden="true" />
          </summary>
          <p className="faq__answer">{t(`faq.items.${id}.a`)}</p>
        </details>
      ))}
    </div>
  );
}
