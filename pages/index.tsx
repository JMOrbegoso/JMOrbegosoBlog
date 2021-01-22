import 'bootstrap/dist/css/bootstrap.min.css';
import PostsList from '../components/posts-list';
import Layout from '../components/layout';
import { getAuthorData, getAllPosts } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Post from '../types/post';
import Author from '../types/author';

type Props = {
  author: Author;
  allPosts: Post[];
};

const Index = ({ author, allPosts }: Props) => {
  return (
    <>
      <Layout author={author}>
        <Head>
          <title> {WEB_NAME} </title>
        </Head>
        <PostsList posts={allPosts} actualPage={1} />
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'excerpt', 'tags']);

  const author = getAuthorData();

  return {
    props: { author, allPosts },
  };
};
