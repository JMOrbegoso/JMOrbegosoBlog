import { readFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { DirectoryType } from '../src/enums/directoryType';
import {
  getfileNamesByLocale,
  getResourcesFileNames,
  getSubDirectories,
  localeDirectory,
  rootDirectory,
  writeFile,
} from '../src/lib/file-system-helpers';

async function generateBlogCache() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  console.log('Generating blog cache…');

  generateBlogCacheFiles(DirectoryType.Posts, [
    'slug',
    'title',
    'date',
    'coverImage',
    'excerpt',
    'ogImage',
    'content',
    'tags',
  ]);

  generateBlogCacheFiles(DirectoryType.Author, [
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
}

const generateBlogCacheFiles = (
  directoryType: DirectoryType,
  fields: string[],
) => {
  const filePaths = getfileNamesByLocale(directoryType);

  let collection: { locale: string; fileContent: string }[] = [];

  filePaths.forEach((dir) => {
    const element = dir.fileNames.map((fileName) =>
      getFileByFileName(directoryType, dir.locale, fileName, fields),
    );

    collection.push({
      locale: dir.locale,
      fileContent: JSON.parse(JSON.stringify(element)),
    });
  });

  writeBlogCacheFiles(directoryType, collection);
};

const getFileByFileName = (
  directoryType: DirectoryType,
  locale: string,
  slug: string,
  fields: string[] = [],
) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(
    localeDirectory(directoryType, locale),
    `${realSlug}.md`,
  );
  const fileContents = readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'fileName') {
      items[field] = realSlug;
    }
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
};

const writeBlogCacheFiles = (
  directoryType: DirectoryType,
  collection: { locale: string; fileContent: string }[],
) => {
  const folderPath =
    directoryType === DirectoryType.Posts
      ? './public/blog-cache/posts'
      : './public/blog-cache/author';

  collection.forEach((element) => {
    mkdirSync(folderPath, { recursive: true });
    writeFile(
      `${folderPath}/${element.locale}.json`,
      JSON.stringify(element.fileContent),
    );
  });
};

export default generateBlogCache;
