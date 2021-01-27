import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { PostTag as PostTagEnum } from '../lib/enums/postTag';
import { getTagTitle } from '../lib/tag-helpers';

type Props = {
  tag: PostTagEnum;
};

const PostTag = ({ tag }: Props) => {
  const tagIconSrc = `/assets/tags/${tag}.svg`;
  const tagTitle = getTagTitle(tag);

  return (
    <>
      <Link href={{ pathname: `/tags/[id]`, query: { id: tag } }}>
        <a title={tagTitle}>
          <div
            className="d-flex justify-content-center m-2 bg-primary"
            style={{
              width: 50,
              height: 50,
              borderRadius: 15,
            }}
          >
            <Image className="p-1" src={tagIconSrc} />
          </div>
        </a>
      </Link>
    </>
  );
};

export default PostTag;
