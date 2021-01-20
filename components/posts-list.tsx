import PostPreview from './post-preview';
import Post from '../types/post';

type Props = {
  posts: Post[];
};

const PostsList = ({ posts }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default PostsList;
