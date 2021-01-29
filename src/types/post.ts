import { PostTag } from '../enums/postTag';

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  tags: PostTag[];
};

export default PostType;
