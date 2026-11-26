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

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
];

export function formatRelative(date: Date, now: Date, locale: string): string {
  const seconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const format = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: 'short' });

  const match = UNITS.find(([, size]) => Math.abs(seconds) >= size);

  return match
    ? format.format(Math.round(seconds / match[1]), match[0])
    : format.format(0, 'second');
}
export function formatPostDate(date: Date, now: Date, locale: string): string {
  const sameYear = date.getFullYear() === now.getFullYear();

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: sameYear ? undefined : 'numeric',
  }).format(date);
}
