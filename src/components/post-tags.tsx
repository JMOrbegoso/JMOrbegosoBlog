import { PostTag as PostTagEnum } from '../enums/postTag';
import PostTag from './post-tag';

type Props = {
  tags: PostTagEnum[];
};

const PostTags = ({ tags }: Props) => {
  return (
    <>
      <div className="row justify-content-center">
        {tags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </div>
    </>
  );
};

export default PostTags;
