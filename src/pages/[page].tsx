import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import PostsList from '../components/posts-list';
import Layout from '../components/layout';
import { getAuthorData, getAllPosts, getLocalResources } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Post from '../types/post';
import Author from '../types/author';
import { POST_PER_PAGE } from '../lib/constants';
import ILocalResources from '../interfaces/ilocalresources';

type Props = {
  author: Author;
  allPosts: Post[];
  actualPage: number;
  localResources: ILocalResources;
};

const IndexPage = ({ author, allPosts, actualPage, localResources }: Props) => {
  return (
    <>
      <Layout author={author} localResources={localResources}>
        <Head>
          <title> {WEB_NAME} </title>
        </Head>
        <PostsList
          posts={allPosts}
          actualPage={actualPage}
          localResources={localResources}
        />
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
  const author = getAuthorData(locale);
  const localResources = await getLocalResources(locale);

  const allPosts = getAllPosts(locale, [
    'title',
    'date',
    'slug',
    'excerpt',
    'tags',
  ]);

  const actualPage = params.page;

  return {
    props: {
      author,
      allPosts,
      actualPage,
      localResources: localResources.default,
    },
  };
};

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths: { locale: string; params: { page: string } }[] = [];

  locales.forEach((locale) => {
    const allPosts = getAllPosts(locale, ['slug']);

    const totalPages = Math.ceil(allPosts.length / POST_PER_PAGE);
    const pagesArray: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }

    const pagePath = pagesArray.map((page) => {
      return {
        locale: locale,
        params: {
          page: page.toString(),
        },
      };
    });

    paths.push(...pagePath);
  });

  return {
    paths: paths,
    fallback: false,
  };
}
