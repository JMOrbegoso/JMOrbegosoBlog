import Link from 'next/link';
import { Pagination } from 'react-bootstrap';
import { POST_PER_PAGE, PAGINATION_LENGTH } from '../lib/constants';
import { useRouter, NextRouter } from 'next/router';

type Props = {
  actualPage: number;
  totalPosts: number;
};

const PostPagination = ({ actualPage, totalPosts }: Props) => {
  const router = useRouter();

  // actualPage comes as string, so is converted to number
  const currentPage = +actualPage;

  let pageItems = [];

  const totalPages = Math.round(totalPosts / POST_PER_PAGE);

  const previousPagesLimit =
    0 >= currentPage - PAGINATION_LENGTH ? 1 : currentPage - PAGINATION_LENGTH;

  const nextPagesLimit =
    currentPage + PAGINATION_LENGTH >= totalPages
      ? totalPages
      : currentPage + PAGINATION_LENGTH;

  for (let i = previousPagesLimit; i < currentPage; i++) {
    pageItems.push(generatePaginationItem(router, i));
  }

  pageItems.push(generatePaginationItem(router, currentPage, true));

  for (let i = currentPage + 1; nextPagesLimit >= i; i++) {
    pageItems.push(generatePaginationItem(router, i));
  }

  return (
    <>
      <div className="row justify-content-center align-items-center">
        <Pagination size="lg">{pageItems}</Pagination>
      </div>
    </>
  );
};

export default PostPagination;

function generatePaginationItem(
  router: NextRouter,
  page: number,
  isActive: boolean = false,
) {
  const pathname = router.pathname.includes('[page]')
    ? router.pathname
    : router.pathname.slice(-1) === '/'
    ? `${router.pathname}[page]`
    : `${router.pathname}/[page]`;
  const query = Object.assign({}, router.query, { page: page });

  return (
    <Link key={page} href={{ pathname, query }} passHref>
      <Pagination.Item active={isActive}>{page}</Pagination.Item>
    </Link>
  );
}
