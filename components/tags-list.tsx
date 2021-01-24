import { PostTag as PostTagEnum } from '../lib/enums/postTag';
import PostTag from './post-tag';

type Props = {
  tags: PostTagEnum[];
};

const TagsList = ({ tags }: Props) => {
  return (
    <>
      <section className="text-center">
        {tags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </section>
    </>
  );
};

export default TagsList;
