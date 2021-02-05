import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import { WEB_NAME } from '../../lib/constants';
import Author from '../../types/author';
import { Button, Form } from 'react-bootstrap';
import { getAllPostsPreviews, getAuthorData } from '../../lib/api';
import PageHeader from '../../components/page-header';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../../enums/translationResource';

type Props = {
  author: Author;
};

const PostsSearcher = ({ author }: Props) => {
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  const [searchTerm, setSearchTerm] = useState('');

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: searchTerm ? '/posts/search/[find]' : '/posts/search/',
      query: { find: searchTerm },
    });
  };

  return (
    <>
      <Layout author={author}>
        <Head>
          <title>
            {t(TranslationResource.search_post)} - {WEB_NAME}
          </title>
        </Head>
        <Container>
          <PageHeader>{`${t(TranslationResource.words_to_find)}`}</PageHeader>
          <Form onSubmit={onFormSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={t(TranslationResource.search_term)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t(TranslationResource.search_post)}
            </Button>
          </Form>
        </Container>
      </Layout>
    </>
  );
};

export default PostsSearcher;

type Params = {
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ locale }: Params) => {
  const author = getAuthorData(locale);
  const posts = getAllPostsPreviews(locale);

  return {
    props: {
      author,
      posts,
    },
  };
};
