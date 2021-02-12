import Link from 'next/link';
import { Tag } from '../enums/tag';
import { getTagTitle } from '../lib/tag-helpers';
import Image from 'next/image';

type Props = {
  tag: Tag;
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
              borderRadius: 15,
            }}
          >
            <Image className="p-1" src={tagIconSrc} height={50} width={50} />
          </div>
        </a>
      </Link>
    </>
  );
};

export default PostTag;
