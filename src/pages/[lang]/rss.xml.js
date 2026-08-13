import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { languages, ui } from '../../i18n/ui';
import { splitLocalizedId } from '../../i18n/utils';

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
  const lang = context.params.lang;
  const posts = await getCollection('blog', ({ id, data }) => splitLocalizedId(id).lang === lang && !data.draft);

  return rss({
    title: ui[lang]['site.title'],
    description: ui[lang]['site.description'],
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/${lang}/blog/${splitLocalizedId(post.id).slug}/`,
      })),
  });
}
