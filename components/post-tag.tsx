import Link from 'next/link';
import { PostTag as PostTagEnum } from '../lib/enums/postTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faNode,
  faReact,
  faAngular,
  faYarn,
  faLinux,
} from '@fortawesome/free-brands-svg-icons';

library.add(faNode, faReact, faAngular, faYarn, faLinux);

type Props = {
  tag: PostTagEnum;
};

const PostTag = ({ tag }: Props) => {
  const tagIcon = getFontAwesomeIcon(tag);
  return (
    <>
      <Link href={`/tag/${tag}`}>
        <a title={tag}>
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

function getFontAwesomeIcon(tag: PostTagEnum) {
  switch (tag) {
    case PostTagEnum.Node:
      return faNode;
    case PostTagEnum.React:
      return faReact;
    case PostTagEnum.Angular:
      return faAngular;
    case PostTagEnum.Yarn:
      return faYarn;
    case PostTagEnum.WSL:
      return faLinux;

    default:
      throw new Error(`Invalid tag: ${tag}`);
  }
}

export default PostTag;
