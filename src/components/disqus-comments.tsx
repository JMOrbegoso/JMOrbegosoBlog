import { DiscussionEmbed } from 'disqus-react';
import PostType from '../types/post';
import { URL_BASE, DISQUS_SHORTNAME } from '../lib/constants';
import { useRouter } from 'next/router';

type Props = {
  post: PostType;
};

const DisqusComments = ({ post }: Props) => {
  const router = useRouter();

  const disqusConfig = {
    url: `${URL_BASE}${router.asPath}`,
    identifier: post.slug,
    title: post.title,
    language: router.locale,
  };

  return (
    <div className="my-5">
      <DiscussionEmbed shortname={DISQUS_SHORTNAME} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
