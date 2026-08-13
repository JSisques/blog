import { describe, expect, it } from 'vitest';
import { formatDate, slugFromId } from '../src/lib/format';

describe('formatDate', () => {
  it('formats a date in long English form', () => {
    expect(formatDate(new Date('2026-08-13'))).toBe('August 13, 2026');
  });
});

describe('slugFromId', () => {
  it('strips a trailing .md extension', () => {
    expect(slugFromId('bienvenida-al-blog.md')).toBe('bienvenida-al-blog');
  });

  it('leaves an id without extension untouched', () => {
    expect(slugFromId('bienvenida-al-blog')).toBe('bienvenida-al-blog');
  });
});
