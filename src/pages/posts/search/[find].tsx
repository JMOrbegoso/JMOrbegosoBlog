import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '../../../components/layout';
import {
  getAllPostsPreviews,
  getAuthor,
  getLocalResources,
} from '../../../lib/api';
import Head from 'next/head';
import { URL_BASE, WEB_NAME, WEB_DESCRIPTION } from '../../../lib/constants';
import PostType from '../../../types/post';
import Author from '../../../types/author';
import ILocalResources from '../../../interfaces/ilocalresources';
import PostsList from '../../../components/posts-list';
import Container from '../../../components/container';
import PageHeader from '../../../components/page-header';

type Props = {
  author: Author;
  allPosts: PostType[];
  localResources: ILocalResources;
  searchTerm: string;
};

const FindPost = ({ author, allPosts, localResources, searchTerm }: Props) => {
  return (
    <>
      <Layout author={author} localResources={localResources}>
        <Head>
          <title> {`${localResources.search_results} - ${WEB_NAME}`} </title>

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
            content={`${localResources.search_results} - ${WEB_NAME}`}
          />
          <meta property="og:description" content={WEB_DESCRIPTION} />
          <meta property="og:image" content={author.picture} />
        </Head>
        <Container>
          <PageHeader>{`${localResources.search_results}`}</PageHeader>
          <PostsList
            posts={allPosts}
            actualPage={1}
            localResources={localResources}
          />
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
  const author = await getAuthor(locale);
  const allPostsPreviews = getAllPostsPreviews(locale).filter((p) =>
    p.title.toLowerCase().includes(query.find.toLowerCase()),
  );
  const localResources = await getLocalResources(locale);

  return {
    props: {
      author,
      allPosts: allPostsPreviews,
      localResources: localResources.default,
      searchTerm: query.find,
    },
  };
}
