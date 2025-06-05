import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import type { IstyleProps } from '../../../types/types';

const SendEmail: React.FC<IstyleProps> = ({ darkMode }) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      console.error('Form is not available.');
      return;
    }

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    try {
      setLoading(true);

      await emailjs.sendForm(serviceId, templateId, form.current, { publicKey });

      setLoading(false);
      alert('Message sent successfully!');
      form.current.reset();
    } catch (err) {
      console.error('Error sending email:', err);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div
        className={`rounded-2xl p-8 ${
          darkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200 bg-white'
        }`}
      >
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-2 block text-sm font-medium">Name</div>
              <input
                type="text"
                name="from_name"
                required
                className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 bg-gray-50 text-gray-900'
                }`}
              />
            </div>
            <div>
              <div className="mb-2 block text-sm font-medium">Email</div>
              <input
                type="email"
                name="email"
                required
                className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 bg-gray-50 text-gray-900'
                }`}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block text-sm font-medium">Message</div>
            <textarea
              name="message"
              rows={5}
              required
              className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-gray-50 text-gray-900'
              }`}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl"
          >
            {loading ? 'Sending message...' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendEmail;
