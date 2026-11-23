import type { YearMonth } from '../data/experience';

export function formatYearMonth(value: YearMonth, locale: string): string {
  const [year, month] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  const name = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' })
    .format(date)
    .replace('.', '');

  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${year}`;
}

export function formatTimeInZone(date: Date, timeZone: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', timeZone }).format(
    date,
  );
}
