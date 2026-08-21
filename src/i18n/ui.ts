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
    'nav.subscribe': 'Suscribirse',
    'home.eyebrow': '// blog',
    'home.title': 'Notas de homelab y desarrollo',
    'home.subtitle':
      'Apuntes sobre lo que construyo, lo que rompo, y cómo lo despliego en mi propio clúster.',
    'home.allTag': 'todos',
    'home.empty': 'Todavía no hay entradas publicadas.',
    'tags.title': 'Tags',
    'tags.description': 'Todas las etiquetas del blog.',
    'tag.postsTaggedWith': 'Entradas etiquetadas con',
    'post.back': '← volver',
    'cta.text': '¿Te interesa esto? Te aviso cuando publique algo nuevo.',
    'subscribe.title': 'Suscríbete',
    'subscribe.body': 'Un aviso cuando publique algo nuevo. Sin spam.',
    'subscribe.placeholder': 'tu@email.com',
    'subscribe.submit': 'Suscribirme',
    'subscribe.success':
      '✓ Listo, te avisaré por aquí cuando publique algo nuevo.',
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
    'nav.subscribe': 'Subscribe',
    'home.eyebrow': '// blog',
    'home.title': 'Notes on homelab and development',
    'home.subtitle':
      'Notes on what I build, what I break, and how I deploy it on my own cluster.',
    'home.allTag': 'all',
    'home.empty': 'No posts published yet.',
    'tags.title': 'Tags',
    'tags.description': 'All tags on the blog.',
    'tag.postsTaggedWith': 'Posts tagged with',
    'post.back': '← back',
    'cta.text':
      "Interested in this? I'll let you know when I publish something new.",
    'subscribe.title': 'Subscribe',
    'subscribe.body': 'A heads-up when I publish something new. No spam.',
    'subscribe.placeholder': 'you@email.com',
    'subscribe.submit': 'Subscribe me',
    'subscribe.success':
      "✓ Done — I'll let you know here when I publish something new.",
    '404.title': 'Page not found',
    '404.description': 'Page not found.',
    '404.back': 'Back to home',
    'footer.source': 'Source on GitHub',
    'lang.switchTo': 'Español',
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
