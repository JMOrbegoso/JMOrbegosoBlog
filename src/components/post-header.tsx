import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import PageHeader from './page-header';
import Author from '../types/author';
import ReadTime from './read-time';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  content: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, date, content, author }: Props) => {
  return (
    <>
      <PageHeader>{title}</PageHeader>
      <div className="hidden md:block md:mb-12">
        <Avatar
          name={`${author.firstname} ${author.lastname}`}
          picture={author.picture}
          web={author.web}
        />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar
            name={`${author.firstname} ${author.lastname}`}
            picture={author.picture}
            web={author.web}
          />
        </div>
        <div className="mb-6 text-lg">
          <div className="row">
            <div className="col-6 text-left">
              <DateFormatter dateString={date} />
            </div>
            <div className="col-6 text-right">
              <ReadTime content={content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
