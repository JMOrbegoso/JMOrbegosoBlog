import 'bootstrap/dist/css/bootstrap.min.css';
import PostsList from '../components/posts-list';
import Layout from '../components/layout';
import { getAuthorData, getAllPosts, getLocalResources } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Post from '../types/post';
import Author from '../types/author';

type Props = {
  author: Author;
  allPosts: Post[];
  localResources: any;
};

const Index = ({ author, allPosts, localResources }: Props) => {
  return (
    <>
      <Layout author={author} localResources={localResources}>
        <Head>
          <title> {WEB_NAME} </title>
        </Head>
        <PostsList posts={allPosts} actualPage={1} />
      </Layout>
    </>
  );
};

export default Index;

type Params = {
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ locale }: Params) => {
  const author = getAuthorData();
  const localResources = await getLocalResources(locale);

  const allPosts = getAllPosts(['title', 'date', 'slug', 'excerpt', 'tags']);

  return {
    props: { author, allPosts, localResources: localResources.default },
  };
};
