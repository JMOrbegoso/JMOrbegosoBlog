import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { getResourcesFileNames, localeDirectory } from './file-system-helpers';
import { DirectoryType } from '../enums/directoryType';

function getPostFullName(locale: string, slug: string) {
  const postsFiles = getResourcesFileNames(DirectoryType.Posts, locale);
  const regex = new RegExp(`([0-9]{4}-[0-9]{2}-[0-9]{2}-${slug}.md)`);
  const post = postsFiles.find((postFile) => regex.test(postFile));
  return post;
}

export function getResourceByFileName(
  directoryType: DirectoryType,
  locale: string,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(
    localeDirectory(directoryType, locale),
    `${realSlug}.md`,
  );
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
  const fullName = getPostFullName(locale, slug);
  if (!fullName) {
    return {};
  }
  const fullPath = join(localeDirectory(DirectoryType.Posts, locale), fullName);
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
  const fullPath = join(
    localeDirectory(DirectoryType.Author, locale),
    `${realSlug}.md`,
  );
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
  const postsFileNames = getResourcesFileNames(DirectoryType.Posts, locale);
  const posts = postsFileNames
    .map((fileName) =>
      getResourceByFileName(DirectoryType.Posts, locale, fileName, fields),
    )
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
  const authorFileNames = getResourcesFileNames(DirectoryType.Author, locale);
  const [aboutMeSlug] = authorFileNames.filter((fileName) =>
    fileName.includes('about-me'),
  );
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
