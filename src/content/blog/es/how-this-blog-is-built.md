---
title: 'Cómo está montado este blog'
description: 'Astro + content collections para las entradas, Docker para empaquetarlo y Argo CD para desplegarlo en mi homelab.'
date: 2026-08-13
tags: ['astro', 'homelab', 'kubernetes']
---

Un resumen rápido de la infraestructura detrás de este blog, para quien le interese el "cómo" tanto como el contenido.

## El sitio

Es un sitio estático con [Astro](https://astro.build). Cada entrada vive como un fichero Markdown bajo `src/content/blog/<idioma>/`, con un frontmatter mínimo:

```md
---
title: 'Título del post'
description: 'Resumen corto para listados, RSS y metadatos.'
date: 2026-08-13
tags: ['tag-uno', 'tag-dos']
---
```

El sitio es bilingüe (español/inglés): cada entrada necesita su traducción en `src/content/blog/es/mi-post.md` y `src/content/blog/en/mi-post.md` — el mismo nombre de fichero en ambas carpetas empareja las dos versiones y activa el selector de idioma. Astro genera páginas de listado, páginas por tag, un feed RSS y un `sitemap.xml` para cada idioma a partir de esa colección.

## El empaquetado

El sitio se compila a HTML estático y se sirve con nginx dentro de un contenedor Docker (`Dockerfile` multi-stage, imagen final basada en `nginx-unprivileged`). La imagen se publica en Docker Hub y en GHCR en cada release.

## El despliegue

El repositorio [JSisques/homelab](https://github.com/JSisques/homelab) define el `Deployment`, `Service` y la `Application` de Argo CD que despliegan la última imagen publicada en el clúster K3s del homelab, expuesta como `blog.jsisques.net` a través del túnel de Cloudflare. Mismo patrón que el resto de sitios estáticos del homelab.
