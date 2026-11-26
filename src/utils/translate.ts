export const baseLanguage = (language: string) => language.split('-')[0];

export function needsTranslation(langs: string[] | undefined, language: string): boolean {
  if (!langs?.length) return language !== 'en';

  return !langs.some((lang) => baseLanguage(lang) === language);
}

export function translateUrl(text: string, language: string): string {
  const params = new URLSearchParams({ sl: 'auto', tl: language, text, op: 'translate' });

  return `https://translate.google.com/?${params}`;
}
