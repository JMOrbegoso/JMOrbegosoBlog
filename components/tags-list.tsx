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
          <div className="mx-2" style={{ display: 'inline-block' }}>
            <PostTag tag={tag} />
          </div>
        ))}
      </section>
    </>
  );
};

export default TagsList;
