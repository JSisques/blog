import { describe, expect, it } from 'vitest';
import { formatDate, slugFromId } from '../src/lib/format';

describe('formatDate', () => {
  it('formats a date in long English form', () => {
    expect(formatDate(new Date('2026-08-13'), 'en')).toBe('August 13, 2026');
  });

  it('formats a date in long Spanish form', () => {
    expect(formatDate(new Date('2026-08-13'), 'es')).toBe('13 de agosto de 2026');
  });
});

describe('slugFromId', () => {
  it('strips a trailing .md extension', () => {
    expect(slugFromId('welcome-to-my-blog.md')).toBe('welcome-to-my-blog');
  });

  it('leaves an id without extension untouched', () => {
    expect(slugFromId('welcome-to-my-blog')).toBe('welcome-to-my-blog');
  });
});
