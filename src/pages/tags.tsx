import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Container from '../components/container';
import Layout from '../components/layout';
import { getAllTags, getAuthorData } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import { PostTag } from '../enums/postTag';
import Author from '../types/author';
import PageHeader from '../components/page-header';
import PostTags from '../components/post-tags';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';

type Props = {
  author: Author;
  tags: PostTag[];
};

const Tags = ({ author, tags }: Props) => {
  const { t, lang } = useTranslation('common');

  return (
    <>
      <Layout author={author}>
        <Container>
          <Head>
            <title>
              {t(TranslationResource.tags)} - {WEB_NAME}
            </title>
          </Head>
          <PageHeader>{t(TranslationResource.tags)}</PageHeader>
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
  const author = getAuthorData(locale);
  const tags = getAllTags(locale);

  return {
    props: { author, tags },
  };
};
