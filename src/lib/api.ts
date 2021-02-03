export async function getAuthor(locale: string) {
  const localizedAuthorData = await import(
    `../../public/blog-cache/author/${locale}.json`
  );
  const localizedAuthor = localizedAuthorData.default;
  const [author] = localizedAuthor;
  return author;
}

export async function getLocalizedPosts(locale: string) {
  const localizedPostsData = await import(
    `../../public/blog-cache/posts/${locale}.json`
  );
  const localizedPosts = localizedPostsData.default;
  const sortedPosts = localizedPosts.sort((post1: any, post2: any) =>
    post1.date > post2.date ? -1 : 1,
  );
  return sortedPosts;
}

export async function getLocalizedTags(locale: string) {
  const localizedPosts = await getLocalizedPosts(locale);
  const allTags = localizedPosts.map((p: any) => p.tags).flat(1);

  const uniqueTags = allTags
    .filter((item: any, index: any) => allTags.indexOf(item) === index)
    .sort((tag1: any, tag2: any) => tag1.localeCompare(tag2));

  return uniqueTags;
}

export async function getPostBySlug(locale: string, slug: string) {
  const localizedPosts = await getLocalizedPosts(locale);
  const post = localizedPosts.find((post: any) => post.slug === slug);
  return post;
}

export async function getLocalResources(locale: string) {
  return await import(`../../lang/${locale}.json`);
}
