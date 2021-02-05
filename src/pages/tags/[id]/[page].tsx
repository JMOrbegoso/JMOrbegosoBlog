import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../../components/container';
import Layout from '../../../components/layout';
import {
  getAllPosts,
  getAllPostsPreviews,
  getAuthorData,
  getAllTags,
} from '../../../lib/api';
import PageHeader from '../../../components/page-header';
import Head from 'next/head';
import { WEB_NAME } from '../../../lib/constants';
import PostType from '../../../types/post';
import Author from '../../../types/author';
import PostsList from '../../../components/posts-list';
import { getTagTitle } from '../../../lib/tag-helpers';
import { POST_PER_PAGE } from '../../../lib/constants';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../../../enums/translationResource';

type Props = {
  author: Author;
  tagTitle: string;
  posts: PostType[];
  actualPage: number;
};

const Tag = ({ author, tagTitle, posts, actualPage }: Props) => {
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  if (!router.isFallback && !tagTitle) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout author={author}>
      <Container>
        <PageHeader>
          {t(TranslationResource.posts_by_tag)} - {tagTitle}
        </PageHeader>
        {router.isFallback ? (
          <PageHeader>{t(TranslationResource.loading)}</PageHeader>
        ) : (
          <>
            <Head>
              <title>
                {tagTitle} - {WEB_NAME}
              </title>
            </Head>
            <PostsList posts={posts} actualPage={actualPage} />
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
  const posts = getAllPostsPreviews(locale).filter((p) =>
    p.tags.includes(params.id),
  );

  const tagTitle = getTagTitle(params.id);

  const actualPage = params.page;

  return {
    props: {
      author,
      tagTitle,
      posts,
      actualPage,
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
