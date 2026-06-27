import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Handshake, Send } from 'lucide-react';
import type { IstyleProps } from '../../../types/types';
import { EMAIL } from '../../../utils/constants';

const SendEmail: React.FC<IstyleProps> = ({ darkMode }) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex: RegExp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

    if (!form.current) {
      console.error('Form is not available.');
      return;
    }

    const formData = new FormData(form.current);
    const email = formData.get('email')?.toString() ?? '';

    if (!regex.test(email) || email === EMAIL) {
      console.error('Invalid Email!');
      alert(t('email_messages.invalid'));
      return;
    }

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    try {
      setLoading(true);

      await emailjs.sendForm(serviceId, templateId, form.current, { publicKey });

      setLoading(false);

      alert(t('email_messages.success'));

      form.current.reset();
    } catch (err) {
      console.error('Error sending email:', err);

      alert(t('email_messages.failed'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full rounded-2xl border px-5 py-4 transition-colors duration-200 ${
    darkMode
      ? `
        border-slate-700
        bg-slate-900
        text-white
        placeholder:text-slate-500
        focus:border-blue-500
        focus:outline-none
      `
      : `
        border-slate-400
        bg-white
        text-slate-900
        placeholder:text-slate-400
        focus:border-blue-400
        focus:outline-none
      `
  }`;

  return (
    <div className="pt-4">
      <div className="mb-8">
        <h2 className="mb-5 flex items-center gap-3 text-4xl font-extrabold">
          {t('contact.emailTitle')}
          <Handshake className={`h-15 w-15 flex-shrink-0 text-blue-400`} />
        </h2>

        <div className={`mb-6 h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />

        <p className={`text-lg leading-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('contact.emailText')}{' '}
          <span className={darkMode ? 'font-bold text-white' : 'font-bold text-gray-900'}>
            {t('contact.emailSubText')}
          </span>
        </p>
      </div>

      <form ref={form} onSubmit={sendEmail}>
        <div className="space-y-5">
          <div>
            <input
              type="text"
              placeholder={t('contact.name')}
              name="from_name"
              required
              className={inputClass}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder={t('contact.email')}
              name="email"
              required
              className={inputClass}
            />
          </div>
          <div>
            <textarea
              rows={5}
              placeholder={t('contact.msg')}
              required
              name="message"
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-400 font-medium text-white transition-colors duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {loading ? (
              t('contact.sending-msg')
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t('contact.send')}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendEmail;
