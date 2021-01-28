import Head from 'next/head';
import { WEB_DESCRIPTION, HOME_OG_IMAGE_URL } from '../lib/constants';

const Meta = () => {
  return (
    <Head>
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={WEB_DESCRIPTION} />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
};

export default Meta;
