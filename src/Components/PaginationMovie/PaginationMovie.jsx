import Pagination from 'react-bootstrap/Pagination';
import "./PaginationMovie.css";
const PaginationMovie = ({ count, setCount }) => {

  const handleChangePage = (newPage) => {
    setCount(newPage);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };
  return (
    <div className='pagination-wrapper'>
      <Pagination className="custom-pagination">
        <Pagination.Prev
          onClick={(e) => {
            if (count > 1)
              handleChangePage(count - 1);
            else
              e.preventDefault();
          }}
        >
          Prev
        </Pagination.Prev>

        <Pagination.Item active>
          {count}
        </Pagination.Item>

        <Pagination.Next
          onClick={(e) => {
            if (count < 10)
              handleChangePage(count + 1);
            else
              e.preventDefault();
          }}
        >
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  )
}

export default PaginationMovie