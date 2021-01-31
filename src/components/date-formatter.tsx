import { parseISO } from 'date-fns';
import { useRouter } from 'next/router';

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const router = useRouter();

  const date = parseISO(dateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const fullDate = date.toLocaleDateString(router.locale, options);

  return (
    <>
      {'🗓 '}
      <time dateTime={fullDate}>{fullDate}</time>
    </>
  );
};

export default DateFormatter;
