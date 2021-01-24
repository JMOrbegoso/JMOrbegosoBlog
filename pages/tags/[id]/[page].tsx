import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../../components/container';
import Layout from '../../../components/layout';
import {
  getAllPosts,
  getAuthorData,
  getAllTags,
  getLocalResources,
} from '../../../lib/api';
import PostTitle from '../../../components/post-title';
import Head from 'next/head';
import { WEB_NAME } from '../../../lib/constants';
import PostType from '../../../types/post';
import Author from '../../../types/author';
import PostsList from '../../../components/posts-list';
import { getTagTitle } from '../../../lib/tag-helpers';
import { POST_PER_PAGE } from '../../../lib/constants';
import ILocalResources from '../../../interfaces/ilocalresources';

type Props = {
  author: Author;
  tagTitle: string;
  postsByTag: PostType[];
  actualPage: number;
  localResources: ILocalResources;
};

const Tag = ({
  author,
  tagTitle,
  postsByTag,
  actualPage,
  localResources,
}: Props) => {
  const router = useRouter();
  if (!router.isFallback && !tagTitle) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout author={author} localResources={localResources}>
      <Container>
        <PostTitle>
          {localResources.posts_by_tag} - {tagTitle}
        </PostTitle>
        {router.isFallback ? (
          <PostTitle>{localResources.loading}</PostTitle>
        ) : (
          <>
            <Head>
              <title>
                {WEB_NAME} - {localResources.posts_by_tag} - {tagTitle}
              </title>
            </Head>
            <PostsList posts={postsByTag} actualPage={actualPage} />
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
    page: number;
  };
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ params, locale }: Params) => {
  const author = getAuthorData(locale);
  const localResources = await getLocalResources(locale);

  const allPosts = getAllPosts(locale, [
    'title',
    'date',
    'slug',
    'excerpt',
    'tags',
  ]);

  const postsByTag = allPosts.filter((p) => p.tags.includes(params.id));

  const tagTitle = getTagTitle(params.id);

  const actualPage = params.page;

  return {
    props: {
      author,
      tagTitle,
      postsByTag,
      actualPage,
      localResources: localResources.default,
    },
  };
};

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths: { locale: string; params: { id: string; page: string } }[] = [];

  locales.forEach((locale) => {
    const allTags = getAllTags(locale);
    const paginatedPostsByTags: {
      tag: string;
      page: number;
      locale: string;
    }[] = [];

    allTags.forEach((tag) => {
      const allPosts = getAllPosts(locale, ['tags']);
      const allPostsByTag = allPosts.filter((p) => p.tags.includes(tag));

      const totalPages = Math.ceil(allPostsByTag.length / POST_PER_PAGE);

      const pagesArray: number[] = [];

      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }

      pagesArray.forEach((page) => {
        paginatedPostsByTags.push({
          tag: tag,
          page: page,
          locale: locale,
        });
      });
    });

    const pagePath = paginatedPostsByTags.map((pt) => {
      return {
        locale: pt.locale,
        params: {
          id: pt.tag,
          page: pt.page.toString(),
        },
      };
    });

    paths.push(...pagePath);
  });

  return {
    paths: paths,
    fallback: false,
  };
}
