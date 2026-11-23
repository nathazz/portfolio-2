import { useTranslation } from 'react-i18next';
import { Window } from '../layout/Window';
import { ContactForm } from './ContactForm';
import { Faq } from './Faq';

/** Two windows side by side: a message to write, and the questions people usually ask. */
export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="gap-fluid-m grid items-start @3xl:grid-cols-2">
      <Window id="contact" title={t('contact.formTitle')}>
        <ContactForm />
      </Window>

      <Window id="faq" title={t('faq.title')} flush>
        <Faq />
      </Window>
    </div>
  );
}
