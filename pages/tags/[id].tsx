import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getAllPosts, getAuthorData, getAllTags } from '../../lib/api';
import PostTitle from '../../components/post-title';
import Head from 'next/head';
import { WEB_NAME } from '../../lib/constants';
import PostType from '../../types/post';
import Author from '../../types/author';
import PostsList from '../../components/posts-list';
import { getTagTitle } from '../../lib/tag-helpers';

type Props = {
  author: Author;
  tagTitle: string;
  postsByTag: PostType[];
};

const Tag = ({ author, tagTitle, postsByTag }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !tagTitle) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout author={author}>
      <Container>
        <PostTitle>Posts by tag: {tagTitle}</PostTitle>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <Head>
              <title>
                {WEB_NAME} - Posts by tag - {tagTitle}
              </title>
            </Head>

            <Container>
              {postsByTag.length > 0 && <PostsList posts={postsByTag} />}
            </Container>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Tag;

type Params = {
  params: {
    id: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const postsByTag = getAllPosts([
    'title',
    'date',
    'slug',
    'excerpt',
    'tags',
  ]).filter((p) => p.tags.includes(params.id));

  const author = getAuthorData();

  const tagTitle = getTagTitle(params.id);

  return {
    props: { author, tagTitle, postsByTag },
  };
};

export async function getStaticPaths() {
  const allTags = getAllTags();

  return {
    paths: allTags.map((tag) => {
      return {
        params: {
          id: tag,
        },
      };
    }),
    fallback: false,
  };
}
