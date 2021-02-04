import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import PostsList from '../components/posts-list';
import Layout from '../components/layout';
import { getLocalizedAuthor, getLocalizedPosts } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Post from '../types/post';
import Author from '../types/author';
import { POST_PER_PAGE } from '../lib/constants';

type Props = {
  author: Author;
  posts: Post[];
  actualPage: number;
};

const IndexPage = ({ author, posts, actualPage }: Props) => {
  return (
    <>
      <Layout author={author}>
        <Head>
          <title> {WEB_NAME} </title>
        </Head>
        <PostsList posts={posts} actualPage={actualPage} />
      </Layout>
    </>
  );
};

export default IndexPage;

type Params = {
  params: {
    page: number;
  };
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ params, locale }: Params) => {
  const author = await getLocalizedAuthor(locale);
  const posts = await getLocalizedPosts(locale);

  const actualPage = params.page;

  return {
    props: {
      author,
      posts,
      actualPage,
    },
  };
};

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths: { locale: string; params: { page: string } }[] = [];

  await Promise.all(
    locales.map(async (locale) => {
      const localizedPosts = await getLocalizedPosts(locale);

      const totalPages = Math.ceil(localizedPosts.length / POST_PER_PAGE);
      const pagesArray: number[] = [];

      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }

      pagesArray.forEach((page) =>
        paths.push({
          locale: locale,
          params: {
            page: page.toString(),
          },
        }),
      );
    }),
  );

  return {
    paths: paths,
    fallback: false,
  };
}
