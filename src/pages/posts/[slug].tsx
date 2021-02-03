import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import {
  getAuthor,
  getPostBySlugSlug,
  getLocalResources,
  getLocalizedPosts,
} from '../../lib/api';
import PageHeader from '../../components/page-header';
import Head from 'next/head';
import { URL_BASE, WEB_NAME } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';
import PostType from '../../types/post';
import Author from '../../types/author';
import PostTags from '../../components/post-tags';
import ILocalResources from '../../interfaces/ilocalresources';
import DisqusComments from '../../components/disqus-comments';
import ShareMenu from '../../components/share-menu';

type Props = {
  author: Author;
  post: PostType;
  localResources: ILocalResources;
};

const Post = ({ author, post, localResources }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout author={author} localResources={localResources}>
      <Container>
        {router.isFallback ? (
          <PageHeader>{localResources.loading}</PageHeader>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} - {WEB_NAME}
                </title>
                <meta property="description" content={post.excerpt} />
                <meta
                  property="author"
                  content={`${author.firstname} ${author.lastname}`}
                />
                <meta name="keywords" content={`${[...post.tags]}`} />
                <meta name="date" content={post.date} />

                <meta
                  property="og:url"
                  content={`${URL_BASE}${router.asPath}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                content={post.content}
                author={author}
                localResources={localResources}
              />
              <PostBody content={post.content} />
              <PostTags tags={post.tags} />
              <ShareMenu post={post} localResources={localResources} />
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
  const author = await getAuthor(locale);
  const post = await getPostBySlugSlug(locale, params.slug);
  const localResources = await getLocalResources(locale);

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
  const params = (
    await Promise.all(
      locales.map(async (locale) => {
        const posts = await getLocalizedPosts(locale);

        return posts.map((post: any) => {
          return {
            locale: locale,
            slug: post.slug,
          };
        });
      }),
    )
  ).flat();

  const paths: { locale: string; params: { slug: string } }[] = params.map(
    (param) => {
      return {
        locale: param.locale,
        params: {
          slug: param.slug,
        },
      };
    },
  );

  return {
    paths: paths,
    fallback: false,
  };
}
