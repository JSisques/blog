import { describe, expect, it } from 'vitest';
import { getLangFromUrl, otherLang, splitLocalizedId } from '../src/i18n/utils';

describe('splitLocalizedId', () => {
  it('splits a localized content collection id into lang and slug', () => {
    expect(splitLocalizedId('es/bienvenida-al-blog')).toEqual({ lang: 'es', slug: 'bienvenida-al-blog' });
    expect(splitLocalizedId('en/welcome')).toEqual({ lang: 'en', slug: 'welcome' });
  });
});

describe('otherLang', () => {
  it('swaps between the two supported languages', () => {
    expect(otherLang('es')).toBe('en');
    expect(otherLang('en')).toBe('es');
  });
});

describe('getLangFromUrl', () => {
  it('reads the lang from the first path segment', () => {
    expect(getLangFromUrl(new URL('https://blog.jsisques.net/en/tags/'))).toBe('en');
    expect(getLangFromUrl(new URL('https://blog.jsisques.net/es/'))).toBe('es');
  });

  it('falls back to the default lang for an unrecognized segment', () => {
    expect(getLangFromUrl(new URL('https://blog.jsisques.net/fr/'))).toBe('es');
  });
});
