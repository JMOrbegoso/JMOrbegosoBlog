import { Tag } from '../enums/tag';
import PostTag from './post-tag';

type Props = {
  tags: Tag[];
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
