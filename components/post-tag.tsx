import Link from 'next/link';
import { PostTag as PostTagEnum } from '../lib/enums/postTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTagTitle, getFontAwesomeIcon } from '../lib/tag-helpers';

type Props = {
  tag: PostTagEnum;
};

const PostTag = ({ tag }: Props) => {
  const tagIcon = getFontAwesomeIcon(tag);
  const tagTitle = getTagTitle(tag);

  return (
    <>
      <Link href={`/tags/${tag}/1`}>
        <a title={tagTitle}>
          <div
            className="container bg-primary"
            style={{
              display: 'inline-grid',
              width: 54,
              height: 54,
              borderRadius: 15,
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <div className="row">
              <div className="col-md-12">
                <FontAwesomeIcon
                  icon={tagIcon}
                  className="fa-2x"
                  style={{ color: 'white' }}
                />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default PostTag;
