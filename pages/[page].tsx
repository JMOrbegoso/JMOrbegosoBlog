import 'bootstrap/dist/css/bootstrap.min.css';
import PostsList from '../components/posts-list';
import Layout from '../components/layout';
import { getAuthorData, getAllPosts } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Post from '../types/post';
import Author from '../types/author';
import { POST_PER_PAGE } from '../lib/constants';

type Props = {
  author: Author;
  allPosts: Post[];
  actualPage: number;
};

const IndexPage = ({ author, allPosts, actualPage }: Props) => {
  return (
    <>
      <Layout author={author}>
        <Head>
          <title> {WEB_NAME} </title>
        </Head>
        <PostsList posts={allPosts} actualPage={actualPage} />
      </Layout>
    </>
  );
};

export default IndexPage;

type Params = {
  params: {
    page: number;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'excerpt', 'tags']);

  const author = getAuthorData();

  const actualPage = params.page;

  return {
    props: { author, allPosts, actualPage },
  };
};

export async function getStaticPaths() {
  const allPosts = getAllPosts([]);

  const totalPages = Math.round(allPosts.length / POST_PER_PAGE);
  const pagesArray: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  return {
    paths: pagesArray.map((page) => {
      return {
        params: {
          page: page.toString(),
        },
      };
    }),
    fallback: false,
  };
}
