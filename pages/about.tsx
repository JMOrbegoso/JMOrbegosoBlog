import Container from '../src/components/container';
import Layout from '../src/components/layout';
import { getAuthorData, getLocalResources } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Author from '../types/author';
import markdownToHtml from '../lib/markdownToHtml';
import markdownStyles from '../src/components/markdown-styles.module.css';
import ILocalResources from '../interfaces/ilocalresources';

type Props = {
  author: Author;
  localResources: ILocalResources;
};

const About = ({ author, localResources }: Props) => {
  return (
    <>
      <Layout author={author} localResources={localResources}>
        <Head>
          <title>
            {localResources.about} - {WEB_NAME}
          </title>
        </Head>
        <Container>
          <div className="max-w-2xl mx-auto">
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
  const localResources = await getLocalResources(locale);

  const content = await markdownToHtml(author.content || '');

  return {
    props: {
      author: {
        ...author,
        content,
      },
      localResources: localResources.default,
    },
  };
};
