import type { Lang } from '../i18n/ui';

const DATE_LOCALES: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-US',
};

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function slugFromId(id: string): string {
  return id.replace(/\.md$/, '');
}
