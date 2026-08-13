# blog

Blog personal de Javier Sisques — notas sobre desarrollo, homelab y DevOps.
Publicado en <https://blog.jsisques.net>.

Sitio estático construido con [Astro](https://astro.build). Cada entrada es
un fichero Markdown en `src/content/blog/`, gestionado como una
[content collection](https://docs.astro.build/en/guides/content-collections/)
con Zod para validar el frontmatter.

## Escribir una entrada

Crea un fichero en `src/content/blog/mi-entrada.md`:

```md
---
title: 'Título de la entrada'
description: 'Resumen corto para el listado, el RSS y los metadatos.'
date: 2026-08-13
tags: ['tag-uno', 'tag-dos']
# draft: true   # opcional, oculta el post hasta quitarlo
# cover: '/imagen.png'   # opcional
---

Contenido en Markdown.
```

La entrada aparece automáticamente en la portada, en `/tags/<tag>/` y en el
feed RSS (`/rss.xml`), ordenada por `date` descendente.

## Desarrollo local

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # astro check + build a ./dist
pnpm preview
pnpm lint
pnpm format
pnpm test
```

Requiere Node 22 y pnpm (ver `packageManager` en `package.json`).

## Docker

```bash
docker build -t jsisques/blog:local .
docker run -p 8080:8080 jsisques/blog:local
```

Ver `docker/README.md` para más detalle. Sitio estático servido por nginx,
sin backend ni base de datos.

## CI/CD

Reutiliza los workflows reusables de
[sisques-labs/workflows](https://github.com/sisques-labs/workflows), mismo
patrón que [sisques-labs/daysoff](https://github.com/sisques-labs/daysoff):

- **CI** (`.github/workflows/ci.yml`): lint, test y build en cada PR.
- **Docker Build** (`.github/workflows/docker.yml`): build multi-arch de
  prueba + escaneo Trivy en cada PR, sin publicar.
- **CodeQL** (`.github/workflows/codeql.yml`): análisis estático semanal y
  en cada push/PR a `develop`/`staging`/`main`.
- **PR Labeler** (`.github/workflows/pr-labeler.yml`): etiqueta las PRs
  según los ficheros que tocan (ver `.github/labeler.yml`).
- **Release Train** (`.github/workflows/release-train.yml`): en cada push a
  `develop`/`staging`/`main` calcula versión semántica (commits
  convencionales vía `cliff.toml`), publica la imagen en Docker Hub
  (`jsisques/blog`) y GHCR (`ghcr.io/jsisques/blog`), y escanea la imagen.

Requiere los secrets `DOCKERHUB_USERNAME` y `DOCKERHUB_TOKEN` configurados
en este repositorio.

Todos los commits siguen [Conventional Commits](https://www.conventionalcommits.org/).

## Despliegue

El despliegue en Kubernetes (Argo CD, namespace, Service NodePort, exposición
vía Cloudflare Tunnel en `blog.jsisques.net`) vive en
[JSisques/homelab](https://github.com/JSisques/homelab), bajo
`kubernetes/applications/blog/`. Este repositorio solo construye y publica
la imagen; el clúster nunca compila el sitio.
