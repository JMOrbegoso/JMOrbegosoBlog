import Head from 'next/head';
import markdownStyles from './markdown-styles.module.css';

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <>
      <Head>
        <base target="_blank" />
      </Head>
      <div className="max-w-2xl mx-auto text-justify">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
};

export default PostBody;
