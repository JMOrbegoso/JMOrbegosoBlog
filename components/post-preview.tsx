import DateFormatter from './date-formatter';
import Link from 'next/link';
import PostTag from './post-tag';
import { PostTag as PostTagEnum } from '../lib/enums/postTag';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  tags: PostTagEnum[];
};

const PostPreview = ({ title, date, excerpt, slug, tags }: Props) => {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        🗓 <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <div className="col-md-12 mb-5 text-center">
        {tags?.map((tag) => (
          <div className="mx-2" style={{ display: 'inline-block' }}>
            <PostTag tag={tag} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPreview;
