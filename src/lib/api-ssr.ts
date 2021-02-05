import Author from '../types/author';
import Post from '../types/post';
import { URL_BASE } from '../lib/constants';
import { DirectoryType } from '../enums/directoryType';

export async function getAuthorFromBlogCache(locale: string): Promise<Author> {
  const localizedAuthor = <Author[]>(
    await getResource(DirectoryType.Author, locale)
  );
  const [author] = localizedAuthor;
  return author;
}

export async function getPostsFromBlogCache(locale: string): Promise<Post[]> {
  const localizedPosts = <Post[]>await getResource(DirectoryType.Posts, locale);
  const sortedPosts = localizedPosts.sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1,
  );
  return sortedPosts;
}

async function getResource(
  directoryType: DirectoryType,
  locale: string,
): Promise<Author[] | Post[]> {
  const resourceName =
    directoryType === DirectoryType.Author ? 'author' : 'posts';
  const resourcePath = `${URL_BASE}/blog-cache/${resourceName}/${locale}.json`;
  return await fetch(resourcePath).then((res: any) => res.json());
}
