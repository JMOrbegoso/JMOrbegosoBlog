import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '../components/container';
import TagsList from '../components/tags-list';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import { PostTag } from '../lib/enums/postTag';

type Props = {
  allTags: PostTag[];
};

const Tags = ({ allTags }: Props) => {
  return (
    <>
      <Layout>
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
  const allPosts = getAllPosts(['tags']);
  const allTags = allPosts.map((p) => p.tags).flat(1);

  const allUniqueTags = allTags
    .filter((item, index) => allTags.indexOf(item) === index)
    .sort((tag1, tag2) => tag1.localeCompare(tag2));

  return {
    props: { allTags: allUniqueTags },
  };
};
