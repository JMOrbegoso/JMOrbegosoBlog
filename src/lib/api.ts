import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = (locale: string) =>
  join(process.cwd(), '_posts', locale);

export function getPostSlugs(locale: string) {
  return fs.readdirSync(postsDirectory(locale));
}

export function getPostBySlug(
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
    .map((slug) => getPostBySlug(locale, slug, fields))
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

export async function getAuthor(locale: string) {
  const localizedAuthorData = await import(
    `../../public/blog-cache/author/${locale}.json`
  );
  const localizedAuthor = localizedAuthorData.default;
  const [author] = localizedAuthor;
  return author;
}

export function getAllTags(locale: string) {
  const allPosts = getAllPosts(locale, ['tags']);
  const allTags = allPosts.map((p) => p.tags).flat(1);

  const allUniqueTags = allTags
    .filter((item, index) => allTags.indexOf(item) === index)
    .sort((tag1, tag2) => tag1.localeCompare(tag2));

  return allUniqueTags;
}

export async function getLocalResources(locale: string) {
  return await import(`../../lang/${locale}.json`);
}
