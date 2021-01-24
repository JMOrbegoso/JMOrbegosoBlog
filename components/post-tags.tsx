import { PostTag as PostTagEnum } from '../lib/enums/postTag';
import PostTag from './post-tag';

type Props = {
  tags: PostTagEnum[];
};

const PostTags = ({ tags }: Props) => {
  return (
    <>
      <div className="col-md-12 mb-5 text-center">
        {tags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </div>
    </>
  );
};

export default PostTags;
