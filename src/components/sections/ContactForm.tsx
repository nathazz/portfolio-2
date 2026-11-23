import emailjs from '@emailjs/browser';
import { Alert02Icon, CheckmarkCircle02Icon, MailSend01Icon } from '../../lib/icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { EMAIL } from '../../data/site';

type Status = 'idle' | 'sending' | 'success' | 'invalid' | 'failed';

/** What to show under the form once a submission settles. */
const FEEDBACK = {
  success: { key: 'contact.status.success', icon: CheckmarkCircle02Icon, tone: 'text-leaf' },
  invalid: { key: 'contact.status.invalid', icon: Alert02Icon, tone: 'text-danger' },
  failed: { key: 'contact.status.failed', icon: Alert02Icon, tone: 'text-danger' },
} as const;

export function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('idle');
  const feedback = status === 'idle' || status === 'sending' ? null : FEEDBACK[status];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '')
      .trim()
      .toLowerCase();

    // The browser has already checked the address format; this only rejects my own address.
    if (email === EMAIL) {
      setStatus('invalid');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form,
        { publicKey: import.meta.env.VITE_PUBLIC_KEY },
      );
      form.reset();
      setStatus('success');
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('failed');
    }
  };

  return (
    <div>
      <h3 className="text-fluid-xl font-bold">{t('contact.title')}</h3>
      <p className="text-ink-soft mt-fluid-2xs">
        {t('contact.formText')} <strong className="text-ink">{t('contact.formSubText')}</strong>
      </p>

      <form onSubmit={handleSubmit} className="gap-fluid-xs mt-fluid-s grid">
        <label className="grid gap-1">
          <span className="text-fluid-sm font-semibold">{t('contact.name')}</span>
          <input type="text" name="from_name" autoComplete="name" required className="field" />
        </label>

        <label className="grid gap-1">
          <span className="text-fluid-sm font-semibold">{t('contact.email')}</span>
          <input type="email" name="email" autoComplete="email" required className="field" />
        </label>

        <label className="grid gap-1">
          <span className="text-fluid-sm font-semibold">{t('contact.message')}</span>
          <textarea name="message" rows={5} required className="field resize-y" />
        </label>

        <div className="gap-fluid-xs flex flex-wrap items-center">
          <button type="submit" disabled={status === 'sending'} className="btn btn--aqua">
            <HugeiconsIcon icon={MailSend01Icon} className="size-5" aria-hidden="true" />
            {status === 'sending' ? t('contact.sending') : t('contact.send')}
          </button>

          <p
            role="status"
            className={`text-fluid-sm flex items-center gap-2 font-semibold ${feedback?.tone ?? ''}`}
          >
            {feedback && (
              <>
                <HugeiconsIcon
                  icon={feedback.icon}
                  className="size-5 flex-none"
                  aria-hidden="true"
                />
                {t(feedback.key)}
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
