import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, PlayCircle, Clock, Calendar, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../Store/slices/favoriteSlice";
// import 'bootstrap/dist/css/bootstrap.min.css';
import TrailerModal from "../TrailerModal/TrailerModal";
import "./MovieDetails.css";
import "../TrailerModal/trailer.css";
import WatchProvidersModal from "../WatchProvidersModal/WatchProvidersModal";
import "../WatchProvidersModal/WatchProviders.css";

const MovieDetails = () => {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const [providersLink, setProvidersLink] = useState("");
  const [showProviders, setShowProviders] = useState(false);

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorite.list);


  const IMG_PATH = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";

  function fetchTrailer() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2M0OTU3Y2E1NWFkODEyMzU1YTFkZmMzNjU5YzIzOCIsIm5iZiI6MTc3NDc4NjEwNC42OCwic3ViIjoiNjljOTE2Mzg5NmI2ZTEwYmViOTMzOTdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KgFTklB0eCvXqQ9n5PIMcwzUWMurVQZ8cp-Z1Ne31bQ",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (vid) =>
            vid.type === "Trailer" &&
            vid.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchData();
    fetchTrailer();
  }, [id]);

  function fetchProviders() {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2M0OTU3Y2E1NWFkODEyMzU1YTFkZmMzNjU5YzIzOCIsIm5iZiI6MTc3NDc4NjEwNC42OCwic3ViIjoiNjljOTE2Mzg5NmI2ZTEwYmViOTMzOTdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KgFTklB0eCvXqQ9n5PIMcwzUWMurVQZ8cp-Z1Ne31bQ'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, options)
      .then(res => res.json())
      .then(data => {

        if (!data.results) {
          setProvidersLink("");
          return;
        }

        const results = data.results;

        // 🔥 اختار أفضل دولة
        const country =
          results.EG ||
          results.US ||
          Object.values(results)[0];

        if (!country) {
          setProvidersLink("");
          return;
        }

        setProvidersLink(country.link);

      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchData();
    fetchTrailer();
    fetchProviders();
  }, [id]);

  function fetchData() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2M0OTU3Y2E1NWFkODEyMzU1YTFkZmMzNjU5YzIzOCIsIm5iZiI6MTc3NDc4NjEwNC42OCwic3ViIjoiNjljOTE2Mzg5NmI2ZTEwYmViOTMzOTdkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KgFTklB0eCvXqQ9n5PIMcwzUWMurVQZ8cp-Z1Ne31bQ'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setMovie(data);
          setLoading(false);
        }, 2000);
      })
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading || !movie)
    return (
      <Loading />
    );

  const isFavorite = favorites?.some((fav) => fav.id === Number(movie.id));

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div
      className="movie-details-page text-white"
      style={{
        backgroundImage: `url(${BACKDROP_PATH}${movie?.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <div className="details-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div className="container position-relative py-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="row align-items-center details-content"
        >

          <div className="col-md-4 d-flex justify-content-center mb-4 mb-md-0">
            <motion.img
              src={`${IMG_PATH}${movie.poster_path}`}
              alt="movie poster"
              className="details-poster img-fluid shadow-lg"
              whileHover={{ scale: 1.05 }}
            />
          </div>

          <div className="col-md-8 details-copy">
            <p className="section-eyebrow mb-2">Movie details</p>
            <h1 className="display-4 fw-bold">{movie.title}</h1>
            <div className="movie-meta mb-3">
              <span><Calendar size={18} /> {movie.release_date}</span>
              <span><Clock size={18} /> {movie.runtime} min</span>
              <span className="rating-chip"><Star size={18} /> {movie.vote_average.toFixed(1)}</span>
            </div>

            <div className="genre-list mb-3">
              {movie.genres.map(g => (
                <span key={g.id} className="genre-badge">{g.name}</span>
              ))}
            </div>

            <div className="overview-panel mb-4">
              {movie.overview}
            </div>

            <div className="details-actions d-flex gap-3">
              <button
                className="btn trailer-action btn-lg d-flex align-items-center gap-2"
                onClick={() => {
                  if (trailerKey) {
                    setShowTrailer(true);
                  } else {
                    alert("No trailer available");
                  }
                }}
              >
                <PlayCircle /> Watch Trailer
              </button>

              <button
                className="btn trailer-action btn-lg d-flex align-items-center gap-2"
                onClick={() => {
                  if (providersLink) {
                    window.open(providersLink, "_blank");
                  } else {
                    alert("No streaming providers available");
                  }
                }}
              >
                <PlayCircle /> Watch Now
              </button>

              {/* <button
                className="btn btn-success btn-lg d-flex align-items-center gap-2"
                disabled={!providersLink}
                onClick={() => window.open(providersLink, "_blank")}
              >
                🎬 Watch Now
              </button> */}

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleFavoriteToggle}
                className={`btn btn-lg d-flex text-white align-items-center gap-2 px-4 fw-semibold watchlist-action ${isFavorite ? "is-active" : ""
                  }`}
              >
                <Heart size={20} fill={isFavorite ? "white" : "none"} />

                {isFavorite
                  ? "Remove from Watchlist"
                  : "Add to Watchlist"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div >
      {
        showTrailer && (
          <TrailerModal
            trailerKey={trailerKey}
            onClose={() => setShowTrailer(false)}
          />
        )
      }

      {showProviders && (
        <WatchProvidersModal
          providers={providers}
          onClose={() => setShowProviders(false)}
        />
      )}
    </div >

  )
}

export default MovieDetails
