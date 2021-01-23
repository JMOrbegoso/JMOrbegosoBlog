import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '../components/container';
import TagsList from '../components/tags-list';
import Layout from '../components/layout';
import { getAllTags, getAuthorData } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import { PostTag } from '../lib/enums/postTag';
import Author from '../types/author';

type Props = {
  author: Author;
  allTags: PostTag[];
};

const Tags = ({ author, allTags }: Props) => {
  return (
    <>
      <Layout author={author}>
        <Head>
          <title> {WEB_NAME} </title>
        </Head>
        <Container>
          {allTags.length > 0 && <TagsList tags={allTags} />}
        </Container>
      </Layout>
    </>
  );
};

export default Tags;

export const getStaticProps = async () => {
  const author = getAuthorData();

  const allTags = getAllTags();

  return {
    props: { author, allTags },
  };
};
