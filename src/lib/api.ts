import { PostTag } from '../enums/postTag';
import Author from '../types/author';
import Post from '../types/post';

export async function getLocalizedAuthor(locale: string): Promise<Author> {
  const localizedAuthorData = await import(
    `../../public/blog-cache/author/${locale}.json`
  );
  const localizedAuthor = localizedAuthorData.default;
  const [author] = localizedAuthor;
  return author;
}

export async function getLocalizedPosts(locale: string): Promise<Post[]> {
  const localizedPostsData = await import(
    `../../public/blog-cache/posts/${locale}.json`
  );
  const localizedPosts: Post[] = localizedPostsData.default;
  const sortedPosts = localizedPosts.sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1,
  );
  return sortedPosts;
}

export async function getLocalizedTags(locale: string): Promise<PostTag[]> {
  const localizedPosts = await getLocalizedPosts(locale);
  const allTags = localizedPosts.map((p) => p.tags).flat(1);

  const uniqueTags = allTags
    .filter((item: any, index: any) => allTags.indexOf(item) === index)
    .sort((tag1, tag2) => tag1.localeCompare(tag2));

  return uniqueTags;
}

export async function getPostBySlug(
  locale: string,
  slug: string,
): Promise<Post | undefined> {
  const localizedPosts = await getLocalizedPosts(locale);
  const post = localizedPosts.find((post) => post.slug === slug);
  return post;
}
