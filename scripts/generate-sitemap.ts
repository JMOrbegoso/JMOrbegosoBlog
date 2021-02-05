import { URL_BASE } from '../src/lib/constants';
import { getAllPosts, getAllTags } from '../src/lib/api';
import globby from 'globby';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { writeFile } from '../src/lib/file-system-helpers';

const blocklist = ['/404'];

async function generateSitemap() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const baseUrl = URL_BASE;

  const pages = await globby([
    'pages/**/*{.js,.mdx,.tsx,.ts}',
    '!pages/**/[*',
    '!pages/_*{.js,.tsx,.ts}',
  ]);

  // normal page routes
  const pageLinks = pages
    .map((page) => {
      const path = page
        .replace('pages', '')
        .replace('.js', '')
        .replace('.tsx', '')
        .replace('.ts', '')
        .replace('.mdx', '')
        .replace('src/', '');
      return path === '/index'
        ? { url: '/', changefreq: 'daily', priority: 0.7 }
        : { url: path, changefreq: 'daily', priority: 0.7 };
    })
    .filter((page) => !blocklist.includes(page.url));

  // post routes
  const posts = getPosts();
  const postLinks = posts.map((post) => ({
    url: `posts/${post.slug}`,
    changefreq: 'daily',
    priority: 0.7,
  }));

  // tag routes
  const tags = getTags();
  const tagLinks = tags.map((tag) => ({
    url: `/tags/${tag}`,
    changefreq: 'daily',
    priority: 0.7,
  }));

  const links = [...pageLinks, ...postLinks, ...tagLinks];
  const stream = new SitemapStream({ hostname: baseUrl });

  const xml = await streamToPromise(
    Readable.from(links).pipe(stream),
  ).then((data) => data.toString());

  writeFile('./public/sitemap.xml', xml);
}

export default generateSitemap;

function getPosts() {
  return getAllPosts('en', [
    'title',
    'date',
    'slug',
    'excerpt',
    'content',
  ]).sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));
}

function getTags() {
  return getAllTags('en');
}
