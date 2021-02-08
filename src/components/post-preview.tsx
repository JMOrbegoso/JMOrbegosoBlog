import Link from 'next/link';
import DateFormatter from './date-formatter';
import { PostTag as PostTagEnum } from '../enums/postTag';
import PostTags from './post-tags';
import ReadTime from './read-time';
import { Card } from 'react-bootstrap';

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
    <Card className="m-2" style={{ minWidth: 300 }}>
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a aria-label={title}>
          <Card.Img variant="top" src={coverImage} />
        </a>
      </Link>

      <Card.Body>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">
            <Card.Title className="text-center">{title}</Card.Title>
          </a>
        </Link>
        <div className="mb-2">
          <div className="row">
            <div className="col-6 text-left">
              <DateFormatter dateString={date} />
            </div>
            <div className="col-6 text-right">
              <ReadTime content={content} />
            </div>
          </div>
        </div>
        <Card.Text className="text-justify">{excerpt}</Card.Text>
      </Card.Body>

      <Card.Footer>
        <PostTags tags={tags} />
      </Card.Footer>
    </Card>
  );
};

export default PostPreview;
