import PostsList from '../components/posts-list';
import Layout from '../components/layout';
import { getAuthorData, getAllPosts, getLocalResources } from '../lib/api';
import Head from 'next/head';
import { URL_BASE, WEB_NAME, WEB_DESCRIPTION } from '../lib/constants';
import Post from '../types/post';
import Author from '../types/author';
import ILocalResources from '../interfaces/ilocalresources';
import generateRssFeed from '../scripts/generate-rss-feed';
import generateSitemap from '../scripts/generate-sitemap';
import generateFavicons from '../scripts/generate-favicons';

type Props = {
  author: Author;
  allPosts: Post[];
  localResources: ILocalResources;
};

const Index = ({ author, allPosts, localResources }: Props) => {
  return (
    <>
      <Layout author={author} localResources={localResources}>
        <Head>
          <title> {WEB_NAME} </title>

          <meta property="description" content={WEB_DESCRIPTION} />
          <meta
            property="author"
            content={`${author.firstname} ${author.lastname}`}
          />
          <meta name="keywords" content={'development'} />
          <meta name="date" content={new Date().toLocaleDateString()} />

          <meta property="og:url" content={`${URL_BASE}`} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={WEB_NAME} />
          <meta property="og:description" content={WEB_DESCRIPTION} />
          <meta property="og:image" content={author.picture} />
        </Head>
        <PostsList
          posts={allPosts}
          actualPage={1}
          localResources={localResources}
        />
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
  // Run one-time scripts
  await generateRssFeed();
  await generateSitemap();
  await generateFavicons();

  const author = getAuthorData(locale);
  const localResources = await getLocalResources(locale);

  const allPosts = getAllPosts(locale, [
    'title',
    'date',
    'slug',
    'excerpt',
    'tags',
  ]);

  return {
    props: { author, allPosts, localResources: localResources.default },
  };
};
