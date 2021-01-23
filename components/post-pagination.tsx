import { Pagination } from 'react-bootstrap';
import { POST_PER_PAGE, PAGINATION_LENGTH } from '../lib/constants';

type Props = {
  actualPage: number;
  totalPosts: number;
};

const PostPagination = ({ actualPage, totalPosts }: Props) => {
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
    pageItems.push(generatePaginationItem(i));
  }

  pageItems.push(generatePaginationItem(currentPage, true));

  for (let i = currentPage + 1; nextPagesLimit >= i; i++) {
    pageItems.push(generatePaginationItem(i));
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

function generatePaginationItem(page: number, isActive: boolean = false) {
  return (
    <Pagination.Item key={page} active={isActive} href={`${page}`}>
      {page}
    </Pagination.Item>
  );
}
