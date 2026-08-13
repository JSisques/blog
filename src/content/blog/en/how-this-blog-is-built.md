---
title: 'How this blog is built'
description: 'Astro + content collections for the posts, Docker to package it, and Argo CD to deploy it on my homelab.'
date: 2026-08-13
tags: ['astro', 'homelab', 'kubernetes']
---

A quick rundown of the infrastructure behind this blog, for anyone as curious about the "how" as about the content itself.

## The site

It's a static site built with [Astro](https://astro.build). Each post lives as a Markdown file under `src/content/blog/<lang>/`, with a minimal frontmatter:

```md
---
title: 'Post title'
description: 'Short summary for listings, RSS, and metadata.'
date: 2026-08-13
tags: ['tag-one', 'tag-two']
---
```

The site is bilingual (Spanish/English): every post needs its translation at `src/content/blog/es/my-post.md` and `src/content/blog/en/my-post.md` — the same filename in both folders pairs the two versions and powers the language switcher. Astro generates listing pages, tag pages, an RSS feed, and a `sitemap.xml` for each language from that collection.

## Packaging

The site compiles to static HTML and is served by nginx inside a Docker container (multi-stage `Dockerfile`, final image based on `nginx-unprivileged`). The image is published to Docker Hub and GHCR on every release.

## Deployment

The [JSisques/homelab](https://github.com/JSisques/homelab) repository defines the `Deployment`, `Service`, and Argo CD `Application` that deploy the latest published image on the homelab's K3s cluster, exposed as `blog.jsisques.net` through the Cloudflare Tunnel. Same pattern as the rest of the homelab's static sites.
