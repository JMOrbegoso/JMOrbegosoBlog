import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import {
  getPostBySlug,
  getAllPosts,
  getAuthorData,
  getLocalResources,
} from '../../lib/api';
import PostTitle from '../../components/post-title';
import Head from 'next/head';
import { WEB_NAME } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';
import PostType from '../../types/post';
import Author from '../../types/author';
import PostTags from '../../components/post-tags';
import ILocalResources from '../../interfaces/ilocalresources';
import DisqusComments from '../../components/disqus-comments';

type Props = {
  author: Author;
  post: PostType;
  morePosts: PostType[];
  localResources: ILocalResources;
};

const Post = ({ author, post, morePosts, localResources }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout author={author} localResources={localResources}>
      <Container>
        {router.isFallback ? (
          <PostTitle>{localResources.loading}</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {WEB_NAME} - {post.title}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={author}
              />
              <PostBody content={post.content} />
              <PostTags tags={post.tags} />
              <DisqusComments post={post} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export async function getStaticProps({ params, locale }: Params) {
  const author = getAuthorData(locale);
  const localResources = await getLocalResources(locale);

  const post = getPostBySlug(locale, params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
    'tags',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      author,
      post: {
        ...post,
        content,
      },
      localResources: localResources.default,
    },
  };
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths: { locale: string; params: { slug: string } }[] = [];

  locales.forEach((locale) => {
    const postPath = getAllPosts(locale, ['slug']).map((post) => {
      return {
        locale: locale,
        params: {
          slug: post.slug,
        },
      };
    });

    paths.push(...postPath);
  });

  return {
    paths: paths,
    fallback: false,
  };
}
