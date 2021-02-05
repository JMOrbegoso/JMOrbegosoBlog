import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const authorDirectory = (locale: string) =>
  join(process.cwd(), '_author', locale);
const postsDirectory = (locale: string) =>
  join(process.cwd(), '_posts', locale);

export function getAuthorSlugs(locale: string) {
  return fs.readdirSync(authorDirectory(locale));
}

export function getPostSlugs(locale: string) {
  return fs.readdirSync(postsDirectory(locale));
}

function getPostFullPath(locale: string, slug: string) {
  const dir = postsDirectory(locale);
  const postsFiles = fs.readdirSync(dir);
  const regex = new RegExp(`([0-9]{4}-[0-9]{2}-[0-9]{2}-${slug}.md)`);
  const post = postsFiles.find((postFile) => regex.test(postFile));
  return post;
}

export function getPostByFilePath(
  locale: string,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory(locale), `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug.slice('xxxx-xx-xx-'.length);
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getPostBySlug(
  locale: string,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullName = getPostFullPath(locale, slug);
  if (!fullName) {
    return {};
  }
  const fullPath = join(postsDirectory(locale), fullName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAuthorBySlug(
  locale: string,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(authorDirectory(locale), `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(locale: string, fields: string[] = []) {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map((slug) => getPostByFilePath(locale, slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllPostsPreviews(locale: string) {
  return getAllPosts(locale, [
    'slug',
    'title',
    'date',
    'coverImage',
    'excerpt',
    'content',
    'tags',
  ]);
}

export function getAuthorData(locale: string) {
  const slugs = getAuthorSlugs(locale);
  const [aboutMeSlug] = slugs.filter((slug) => slug.includes('about-me'));
  const aboutMeData = getAuthorBySlug(locale, aboutMeSlug, [
    'firstname',
    'lastname',
    'picture',
    'web',
    'facebook',
    'twitter',
    'github',
    'linkedin',
    'youtube',
    'instagram',
    'content',
  ]);
  return aboutMeData;
}

export function getAllTags(locale: string) {
  const allPosts = getAllPosts(locale, ['tags']);
  const allTags = allPosts.map((p) => p.tags).flat(1);

  const allUniqueTags = allTags
    .filter((item, index) => allTags.indexOf(item) === index)
    .sort((tag1, tag2) => tag1.localeCompare(tag2));

  return allUniqueTags;
}
