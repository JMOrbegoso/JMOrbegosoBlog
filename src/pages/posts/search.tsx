import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import { WEB_NAME } from '../../lib/constants';
import Author from '../../types/author';
import ILocalResources from '../../interfaces/ilocalresources';
import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import {
  getAllPostsPreviews,
  getAuthorData,
  getLocalResources,
} from '../../lib/api';
import PageHeader from '../../components/page-header';
import React, { useState } from 'react';

type Props = {
  author: Author;
  localResources: ILocalResources;
};

const PostsSearcher = ({ author, localResources }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Layout author={author} localResources={localResources}>
        <Head>
          <title>
            {localResources.search_post} - {WEB_NAME}
          </title>
        </Head>
        <Container>
          <PageHeader>{`${localResources.words_to_find}`}</PageHeader>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={localResources.search_term}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Link
              href={{
                pathname: searchTerm
                  ? '/posts/search/[find]'
                  : '/posts/search/',
                query: { find: searchTerm },
              }}
              passHref
            >
              <Button variant="primary" type="submit">
                {localResources.search_post}
              </Button>
            </Link>
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
  const allPostsPreviews = getAllPostsPreviews(locale);
  const localResources = await getLocalResources(locale);

  return {
    props: {
      author,
      allPosts: allPostsPreviews,
      localResources: localResources.default,
    },
  };
};
