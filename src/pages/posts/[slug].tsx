import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import { getPostBySlug, getAllPosts, getAuthorData } from '../../lib/api';
import PageHeader from '../../components/page-header';
import Head from 'next/head';
import { URL_BASE, WEB_NAME } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';
import PostType from '../../types/post';
import Author from '../../types/author';
import PostTags from '../../components/post-tags';
import DisqusComments from '../../components/disqus-comments';
import ShareMenu from '../../components/share-menu';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../../enums/translationResource';

type Props = {
  author: Author;
  post: PostType;
};

const Post = ({ author, post }: Props) => {
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout author={author}>
      <Container>
        {router.isFallback ? (
          <PageHeader>{t(TranslationResource.loading)}</PageHeader>
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
              />
              <PostBody content={post.content} />
              <PostTags tags={post.tags} />
              <ShareMenu post={post} />
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
