import DateFormatter from './date-formatter';
import Link from 'next/link';
import { PostTag as PostTagEnum } from '../enums/postTag';
import PostTags from './post-tags';
import CoverImage from './cover-image';
import ReadTime from './read-time';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  content: string;
  tags: PostTagEnum[];
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  content,
  tags,
}: Props) => {
  return (
    <div className="my-3">
      <h3 className="text-3xl mb-3 leading-snug text-center">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <div className="row">
          <div className="col-6 text-left">
            <DateFormatter dateString={date} />
          </div>
          <div className="col-6 text-right">
            <ReadTime content={content} />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <p className="text-lg leading-relaxed mb-4 text-justify">{excerpt}</p>
      <PostTags tags={tags} />
    </div>
  );
};

export default PostPreview;
