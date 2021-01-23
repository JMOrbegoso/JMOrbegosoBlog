import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '../components/container';
import Layout from '../components/layout';
import { getAuthorData } from '../lib/api';
import Head from 'next/head';
import { WEB_NAME } from '../lib/constants';
import Author from '../types/author';
import markdownToHtml from '../lib/markdownToHtml';
import markdownStyles from '../components/markdown-styles.module.css';

type Props = {
  author: Author;
};

const About = ({ author }: Props) => {
  return (
    <>
      <Layout author={author}>
        <Head>
          <title> {WEB_NAME} - About </title>
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

export const getStaticProps = async () => {
  const author = getAuthorData();

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
