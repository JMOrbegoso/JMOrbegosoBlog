import PostPreview from './post-preview';
import Post from '../types/post';
import { POST_PER_PAGE } from '../lib/constants';
import Container from './container';
import PostPagination from './post-pagination';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';

type Props = {
  posts: Post[];
  actualPage: number;
};

const PostsList = ({ posts, actualPage }: Props) => {
  const { t, lang } = useTranslation('common');

  const initialPosition = (actualPage - 1) * POST_PER_PAGE;
  const finalPosition = initialPosition + POST_PER_PAGE;
  const visiblePosts = posts.slice(initialPosition, finalPosition);

  if (0 >= posts.length) {
    return (
      <>
        <section className="text-center">
          <Container>
            <h1>{t(TranslationResource.no_posts_found)}</h1>
          </Container>
        </section>
      </>
    );
  }

  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 mb-32">
          {visiblePosts.map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt}
              content={post.content}
              tags={post.tags}
            />
          ))}
        </div>
        <PostPagination actualPage={actualPage} totalPosts={posts.length} />
      </Container>
    </section>
  );
};

export default PostsList;
