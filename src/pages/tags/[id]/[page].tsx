import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../../components/container';
import Layout from '../../../components/layout';
import {
  getLocalizedPosts,
  getAuthor,
  getLocalizedTags,
  getLocalResources,
} from '../../../lib/api';
import PageHeader from '../../../components/page-header';
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
        <PageHeader>
          {localResources.posts_by_tag} - {tagTitle}
        </PageHeader>
        {router.isFallback ? (
          <PageHeader>{localResources.loading}</PageHeader>
        ) : (
          <>
            <Head>
              <title>
                {tagTitle} - {WEB_NAME}
              </title>
            </Head>
            <PostsList
              posts={postsByTag}
              actualPage={actualPage}
              localResources={localResources}
            />
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
  const author = await getAuthor(locale);
  const postsByTag = (await getLocalizedPosts(locale)).filter((p: any) =>
    p.tags.includes(params.id),
  );
  const localResources = await getLocalResources(locale);

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
  const params: { locale: string; id: string; page: string }[] = [];

  await Promise.all(
    locales.map(async (locale) => {
      const allTags = await getLocalizedTags(locale);

      const postsQuantity = await Promise.all(
        allTags.map(async (tag: any) => {
          return {
            locale: locale,
            tag: tag,
            quantity: (await getLocalizedPosts(locale)).filter((p: any) =>
              p.tags.includes(tag),
            ).length,
          };
        }),
      );

      const postsQuantityPaginated = postsQuantity.map((posts: any) => {
        const totalPages = Math.ceil(posts.quantity / POST_PER_PAGE);

        const pagesArray: number[] = [];

        for (let i = 1; i <= totalPages; i++) {
          pagesArray.push(i);
        }

        return pagesArray.map((page: any) => {
          return {
            locale: locale,
            id: posts.tag,
            page: page,
          };
        });
      });

      params.push(...postsQuantityPaginated.flat());
    }),
  );

  const paths: {
    locale: string;
    params: { id: string; page: string };
  }[] = params.map((param) => {
    return {
      locale: param.locale,
      params: {
        id: param.id,
        page: param.page.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
