import { useEffect, useState } from "react";
import Pagination from "../PaginationMovie/PaginationMovie";
import MovieCard from "../MovieCard/MovieCard";
// import { Star, Search } from "lucide-react";
import "./Content.css";

const Content = () => {

  const [movies, setMovies] = useState([]);
  // const [movieDetails, setMovieDetails] = useState({});
  // const [lgShow, setLgShow] = useState(false);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");



  function fetchData() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2M0OTU3Y2E1NWFkODEyMzU1YTFkZmMzNjU5YzIzOCIsIm5iZiI6MTc3NDc4NjEwNC42OCwic3ViIjoiNjljOTE2Mzg5NmI2ZTEwYmViOTMzOTdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KgFTklB0eCvXqQ9n5PIMcwzUWMurVQZ8cp-Z1Ne31bQ'
      }
    };

    fetch(`https://api.themoviedb.org/3/trending/movie/day?page=${count}`, options)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      // .then(data => console.log(data.results))
      .catch(err => console.error(err));
  }

  const searchMovies = async () => {
    if (!query.trim()) {
      fetchData();
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2M0OTU3Y2E1NWFkODEyMzU1YTFkZmMzNjU5YzIzOCIsIm5iZiI6MTc3NDc4NjEwNC42OCwic3ViIjoiNjljOTE2Mzg5NmI2ZTEwYmViOTMzOTdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KgFTklB0eCvXqQ9n5PIMcwzUWMurVQZ8cp-Z1Ne31bQ`,
            accept: "application/json",
          },
        }
      );

      const data = await res.json();
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  // if (loading || !movies)
  //   return (
  //     <Loading />
  //   );

  return (
    <div className="bg-dark min-vh-100 py-5">
      <h1 className="mb-4 display-4 fw-bold text-danger text-center">Trending Movies</h1>

      {/* Search Section */}
      <div className="row container-fluid justify-content-center mb-5">
        <div className="col-md-6">
          <div className="input-group shadow-lg">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchMovies()}
            />

            <button
              className="btn search-btn"
              onClick={searchMovies}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-wrap justify-content-center gap-4">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <Pagination
        count={count}
        setCount={setCount}
      />
    </div>
  );
}

export default Content