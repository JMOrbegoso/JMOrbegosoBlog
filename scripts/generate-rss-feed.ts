import {
  WEB_NAME,
  WEB_DESCRIPTION,
  URL_BASE,
  COPYRIGHT,
} from '../src/lib/constants';
import { getAuthorData, getAllPostsPreviews } from '../src/lib/api';
import { Feed } from 'feed';
import markdownToHtml from '../src/lib/markdownToHtml';
import { writeFile } from '../src/lib/file-system-helpers';

async function generateRssFeed() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const author = getAuthor();
  const posts = getAllPostsPreviews('en');

  const baseUrl = URL_BASE;

  const feed = new Feed({
    title: `${WEB_NAME}`,
    description: `${WEB_DESCRIPTION}`,
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/assets/blog/logo.png`,
    favicon: `${baseUrl}/favicon/favicon.ico`,
    copyright: `All rights reserved ${COPYRIGHT}.`,
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
      json: `${baseUrl}/feed.json`,
      atom: `${baseUrl}/atom.xml`,
    },
    author: author,
  });

  const entries = await Promise.all(
    posts.map(async (post) => {
      const url = `${baseUrl}/post/${post.slug}`;

      return {
        id: url,
        link: url,
        title: post.title,
        description: post.excerpt,
        content: await markdownToHtml(post.content),
        author: [author],
        contributor: [author],
        date: new Date(post.date),
        image: `${baseUrl}${post.coverImage}`,
      };
    }),
  );

  entries.forEach((entry) => feed.addItem(entry));

  feed.addCategory('Development');

  feed.addContributor(author);

  writeFile('./public/feed.xml', feed.rss2());
  writeFile('./public/atom.xml', feed.atom1());
  writeFile('./public/feed.json', feed.json1());
}

export default generateRssFeed;

function getAuthor() {
  const authorData = getAuthorData('en');
  return {
    name: `${authorData.firstname} ${authorData.lastname}`,
    link: authorData.web,
  };
}
