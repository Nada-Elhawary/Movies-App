import Pagination from 'react-bootstrap/Pagination';
import "./PaginationMovie.css";
const PaginationMovie = ({ count, setCount }) => {

  return (
    <div className='pagination-wrapper'>
      <Pagination className="custom-pagination">
        <Pagination.Prev
          onClick={(e) => {
            if (count > 1)
              setCount(count - 1);
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
            if (count < 5)
              setCount(count + 1);
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