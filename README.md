# blog

Javier Sisques' personal blog — notes on software development, homelab, and
DevOps. Published at <https://blog.jsisques.net>.

Static site built with [Astro](https://astro.build). Each post is a
Markdown file in `src/content/blog/<lang>/`, managed as a
[content collection](https://docs.astro.build/en/guides/content-collections/)
with Zod validating the frontmatter.

## Internationalization

The site is bilingual (Spanish and English), routed under `/es/` and `/en/`
— `/` redirects to `/es/` (the default locale). UI strings live in
`src/i18n/ui.ts`; `src/i18n/utils.ts` has the helpers (`getLangFromUrl`,
`useTranslations`, `splitLocalizedId`, ...) pages and components use to
read the current locale and translate.

Every post is required in both languages. The same filename in
`src/content/blog/es/` and `src/content/blog/en/` pairs the two versions —
that's what the language switcher in the header links to. `hreflang`
alternate tags and the sitemap's per-locale `xhtml:link` entries are
generated from that pairing too.

## Writing a post

Create matching files at `src/content/blog/es/my-post.md` and
`src/content/blog/en/my-post.md` (same filename in both folders):

```md
---
title: 'Post title'
description: 'Short summary for the listing, RSS feed, and metadata.'
date: 2026-08-13
tags: ['tag-one', 'tag-two']
# draft: true   # optional, hides the post until removed
# cover: '/image.png'   # optional
---

Markdown content.
```

The post automatically appears on `/<lang>/`, under `/<lang>/tags/<tag>/`,
and in that locale's RSS feed (`/<lang>/rss.xml`), sorted by `date`
descending.

## Local development

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # astro check + build to ./dist
pnpm preview
pnpm lint
pnpm format
pnpm test
```

Requires Node 22 and pnpm (see `packageManager` in `package.json`).

## Docker

```bash
docker build -t jsisques/blog:local .
docker run -p 8080:8080 jsisques/blog:local
```

See `docker/README.md` for more detail. Static site served by nginx, no
backend, no database.

## CI/CD

Reuses the reusable workflows from
[sisques-labs/workflows](https://github.com/sisques-labs/workflows), same
pattern as [sisques-labs/daysoff](https://github.com/sisques-labs/daysoff):

- **CI** (`.github/workflows/ci.yml`): lint, test, and build on every PR.
- **Docker Build** (`.github/workflows/docker.yml`): multi-arch test build
  + Trivy scan on every PR, without publishing.
- **CodeQL** (`.github/workflows/codeql.yml`): static analysis weekly and
  on every push/PR to `develop`/`staging`/`main`.
- **PR Labeler** (`.github/workflows/pr-labeler.yml`): labels PRs based on
  the files they touch (see `.github/labeler.yml`).
- **Release Train** (`.github/workflows/release-train.yml`): on every push
  to `develop`/`staging`/`main`, computes a semantic version (conventional
  commits via `cliff.toml`), publishes the image to Docker Hub
  (`jsisques/blog`) and GHCR (`ghcr.io/jsisques/blog`), and scans the image.

Requires the `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets to be
configured on this repository.

All commits follow [Conventional Commits](https://www.conventionalcommits.org/).

## Deployment

Kubernetes deployment (Argo CD, namespace, NodePort Service, exposed via
Cloudflare Tunnel at `blog.jsisques.net`) lives in
[JSisques/homelab](https://github.com/JSisques/homelab), under
`kubernetes/applications/blog/`. This repository only builds and publishes
the image; the cluster never builds the site.
