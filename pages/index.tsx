import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '../components/container';
import PostsList from '../components/posts-list';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Post from '../types/post';

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title> {WEB_NAME} </title>
        </Head>
        <Container>
          {allPosts.length > 0 && <PostsList posts={allPosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
  ]);

  return {
    props: { allPosts },
  };
};
