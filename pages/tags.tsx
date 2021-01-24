import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '../components/container';
import TagsList from '../components/tags-list';
import Layout from '../components/layout';
import { getAllTags, getAuthorData, getLocalResources } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import { PostTag } from '../lib/enums/postTag';
import Author from '../types/author';
import ILocalResources from '../interfaces/ilocalresources';
import PostTitle from '../components/post-title';

type Props = {
  author: Author;
  allTags: PostTag[];
  localResources: ILocalResources;
};

const Tags = ({ author, allTags, localResources }: Props) => {
  return (
    <>
      <Layout author={author} localResources={localResources}>
        <Container>
          <Head>
            <title>
              {WEB_NAME} - {localResources.tags}
            </title>
          </Head>
          <PostTitle>{localResources.tags}</PostTitle>
          <Container>
            {allTags.length > 0 && <TagsList tags={allTags} />}
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
  const author = getAuthorData(locale);
  const localResources = await getLocalResources(locale);

  const allTags = getAllTags(locale);

  return {
    props: { author, allTags, localResources: localResources.default },
  };
};
