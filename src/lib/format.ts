import type { YearMonth } from '../data/experience';

/** '2024-07' → 'Jul 2024', with the month name in the given locale. */
export function formatYearMonth(value: YearMonth, locale: string): string {
  const [year, month] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  // Some locales return 'jul.' in lowercase with a trailing dot.
  const name = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' })
    .format(date)
    .replace('.', '');

  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${year}`;
}

/** Current wall-clock time in a time zone, e.g. '14:32' or '2:32 PM'. */
export function formatTimeInZone(date: Date, timeZone: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', timeZone }).format(
    date,
  );
}
