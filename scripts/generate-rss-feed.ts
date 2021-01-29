import { mkdirSync, existsSync, unlinkSync, writeFileSync } from 'fs';
import {
  WEB_NAME,
  WEB_DESCRIPTION,
  URL_BASE,
  COPYRIGHT,
} from '../src/lib/constants';
import { getAuthorData, getAllPosts } from '../src/lib/api';
import { Feed } from 'feed';
import markdownToHtml from '../src/lib/markdownToHtml';

async function generateRssFeed() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const author = getAuthor();
  const posts = getPosts();

  const baseUrl = URL_BASE;

  const feed = new Feed({
    title: `${WEB_NAME}`,
    description: `${WEB_DESCRIPTION}`,
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/images/logo.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${COPYRIGHT}.`,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: author,
  });

  const entries = await Promise.all(
    posts.map(async (post) => {
      const url = `${baseUrl}/post/${post.slug}`;
      const postContent = await markdownToHtml(post.content);

      return {
        id: url,
        link: url,
        title: post.title,
        description: post.excerpt,
        content: postContent,
        author: [author],
        contributor: [author],
        date: new Date(post.date),
        image: post.image,
      };
    }),
  );

  entries.forEach((entry) => feed.addItem(entry));

  feed.addCategory('Development');

  feed.addContributor(author);

  mkdirSync('./public/rss', { recursive: true });
  writeRssFile('./public/rss/feed.xml', feed.rss2());
  writeRssFile('./public/rss/atom.xml', feed.atom1());
  writeRssFile('./public/rss/feed.json', feed.json1());
}

export default generateRssFeed;

function writeRssFile(filePath: string, fileContent: string) {
  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    writeFileSync(filePath, fileContent);
    console.info(`${filePath} file successfully created`);
  } catch (error) {
    console.info(
      `Could not generate the ${filePath} file or the previous file could not be deleted`,
    );
  }
}

function getAuthor() {
  const authorData = getAuthorData('en');
  return {
    name: `${authorData.firstname} ${authorData.lastname}`,
    link: authorData.web,
  };
}
function getPosts() {
  return getAllPosts('en', [
    'title',
    'date',
    'slug',
    'excerpt',
    'content',
  ]).sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1));
}
