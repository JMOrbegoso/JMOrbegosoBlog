import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Container from '../components/container';
import Layout from '../components/layout';
import { getAuthorData } from '../lib/api';
import PageHeader from '../components/page-header';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Author from '../types/author';
import markdownToHtml from '../lib/markdownToHtml';
import markdownStyles from '../components/markdown-styles.module.css';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';

type Props = {
  author: Author;
};

const About = ({ author }: Props) => {
  const { t, lang } = useTranslation('common');

  return (
    <>
      <Layout author={author}>
        <Head>
          <title>
            {t(TranslationResource.about)} - {WEB_NAME}
          </title>
        </Head>
        <PageHeader>{t(TranslationResource.about)}</PageHeader>
        <Container>
          <div className="max-w-2xl mx-auto text-justify">
            <div
              className={markdownStyles['markdown']}
              dangerouslySetInnerHTML={{ __html: author.content }}
            />
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default About;

type Params = {
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ locale }: Params) => {
  const author = getAuthorData(locale);

  const content = await markdownToHtml(author.content || '');

  return {
    props: {
      author: {
        ...author,
        content,
      },
    },
  };
};
