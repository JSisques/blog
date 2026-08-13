# blog

Javier Sisques' personal blog — notes on software development, homelab, and DevOps.

Static Astro site served by nginx. No backend, no database.

## Quick start

```bash
docker run -p 8080:8080 jsisques/blog:latest
```

Then open http://localhost:8080.

## Ports

| Port | Purpose             |
| ---- | ------------------- |
| 8080 | HTTP (static site)  |
