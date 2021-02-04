import { READ_WORDS_PER_MINUTE } from '../lib/constants';

type Props = {
  content: string;
};

const ReadTime = ({ content }: Props) => {
  const wordsQuantity = content.split(' ').filter((w) => w.length > 3).length;
  const readTime = Math.ceil(wordsQuantity / (READ_WORDS_PER_MINUTE ?? 200));

  return (
    <>
      <span
        className="readtime"
        data-toggle="tooltip"
        data-placement="bottom"
        title={localResources.read_time}
      >
        {`⏱ ${readTime} min`}
      </span>
    </>
  );
};

export default ReadTime;
