import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Container from '../components/container';
import Layout from '../components/layout';
import { getLocalizedTags, getLocalizedAuthor } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import { PostTag } from '../enums/postTag';
import Author from '../types/author';
import PageHeader from '../components/page-header';
import PostTags from '../components/post-tags';

type Props = {
  author: Author;
  tags: PostTag[];
};

const Tags = ({ author, tags }: Props) => {
  return (
    <>
      <Layout author={author} localResources={localResources}>
        <Container>
          <Head>
            <title>
              {localResources.tags} - {WEB_NAME}
            </title>
          </Head>
          <PageHeader>{localResources.tags}</PageHeader>
          <Container>
            <PostTags tags={tags} />
          </Container>
        </Container>
      </Layout>
    </>
  );
};

export default Tags;

type Params = {
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ locale }: Params) => {
  const author = await getLocalizedAuthor(locale);
  const tags = await getLocalizedTags(locale);

  return {
    props: { author, tags },
  };
};
