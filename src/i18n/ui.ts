export const defaultLang = 'es';

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const ui = {
  es: {
    'site.title': 'Javier Sisques — Blog',
    'site.description': 'Notas sobre desarrollo, homelab y DevOps.',
    'nav.home': 'Inicio',
    'nav.tags': 'Tags',
    'nav.rss': 'RSS',
    'home.title': 'Últimas entradas',
    'home.empty': 'Todavía no hay entradas publicadas.',
    'tags.title': 'Tags',
    'tags.description': 'Todas las etiquetas del blog.',
    'tag.postsTaggedWith': 'Entradas etiquetadas con',
    '404.title': 'Página no encontrada',
    '404.description': 'Página no encontrada.',
    '404.back': 'Volver al inicio',
    'footer.source': 'Código fuente en GitHub',
    'lang.switchTo': 'English',
  },
  en: {
    'site.title': 'Javier Sisques — Blog',
    'site.description': 'Notes on software development, homelab, and DevOps.',
    'nav.home': 'Home',
    'nav.tags': 'Tags',
    'nav.rss': 'RSS',
    'home.title': 'Latest posts',
    'home.empty': 'No posts published yet.',
    'tags.title': 'Tags',
    'tags.description': 'All tags on the blog.',
    'tag.postsTaggedWith': 'Posts tagged with',
    '404.title': 'Page not found',
    '404.description': 'Page not found.',
    '404.back': 'Back to home',
    'footer.source': 'Source on GitHub',
    'lang.switchTo': 'Español',
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
