import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '../../../components/layout';
import Head from 'next/head';
import { URL_BASE, WEB_NAME, WEB_DESCRIPTION } from '../../../lib/constants';
import {
  getAuthorFromBlogCache,
  getPostsFromBlogCache,
} from '../../../lib/api-ssr';
import PostType from '../../../types/post';
import Author from '../../../types/author';
import PostsList from '../../../components/posts-list';
import Container from '../../../components/container';
import PageHeader from '../../../components/page-header';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../../../enums/translationResource';

type Props = {
  author: Author;
  posts: PostType[];
  searchTerm: string;
};

const FindPost = ({ author, posts, searchTerm }: Props) => {
  const { t, lang } = useTranslation('common');

  return (
    <>
      <Layout author={author}>
        <Head>
          <title>
            {`${t(TranslationResource.search_results)} - ${WEB_NAME}`}{' '}
          </title>

          <meta property="description" content={WEB_DESCRIPTION} />
          <meta
            property="author"
            content={`${author.firstname} ${author.lastname}`}
          />
          <meta name="keywords" content={'development'} />
          <meta name="date" content={new Date().toLocaleDateString()} />

          <meta property="og:url" content={`${URL_BASE}`} />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={`${t(TranslationResource.search_results)} - ${WEB_NAME}`}
          />
          <meta property="og:description" content={WEB_DESCRIPTION} />
          <meta property="og:image" content={author.picture} />
        </Head>
        <Container>
          <PageHeader>{`${t(TranslationResource.search_results)}`}</PageHeader>
          <PostsList posts={posts} actualPage={1} />
        </Container>
      </Layout>
    </>
  );
};

export default FindPost;

type Params = {
  query: {
    find: string;
  };
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export async function getServerSideProps({ query, locale }: Params) {
  const author = await getAuthorFromBlogCache(locale);
  const posts = (await getPostsFromBlogCache(locale)).filter((p) =>
    p.title.toLowerCase().includes(query.find.toLowerCase()),
  );

  return {
    props: {
      author,
      posts,
      searchTerm: query.find,
    },
  };
}
