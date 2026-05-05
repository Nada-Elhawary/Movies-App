// import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../Store/slices/favoriteSlice";
import { Heart } from "lucide-react";
import "./MovieCard.css"

const MovieCard = ({ movie }) => {
    const IMG_PATH = "https://image.tmdb.org/t/p/w500";
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";
    // const navigate = useNavigate()

    const dispatch = useDispatch();

    const favorites = useSelector(
        (state) => state.favorite.list
    );

    const isFavorite = favorites.find(
        (fav) => fav.id === movie.id
    );
    return (
        // <Card onClick={() => {
        //     setMovieDetails(movie);
        //     setLgShow(true)
        // }} style={{ width: '18rem', margin: '15px' }}>
        //     <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path} />
        //     <Card.Body>
        //         <Card.Title>{movie.title}</Card.Title>
        //     </Card.Body>
        // </Card>
        // <div className="card_box" onClick={() => {
        //     navigate('/details/' + movie.id)
        // }}>
        //     <span>
        //     </span>
        //     <img src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path} width={'300px'} height={'350px'} />
        // </div>
        <motion.div
            whileHover={{ scale: 0.95 }}
            className="card_box"
        >
            {movie.vote_average > 7 && (
                <span></span>
            )}

            <Link
                to={`/details/${movie.id}`}
                className="text-decoration-none text-white"
            >
                <div
                    className="favorite-icon"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleFavorite(movie));
                    }}
                >
                    <Heart
                        size={22}
                        fill={isFavorite ? "#ff4d6d" : "transparent"}
                        color={isFavorite ? "#ff4d6d" : "white"}
                    />
                </div>
                <img
                    src={`${IMG_PATH}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-100 h-100 object-fit-cover"
                />
            </Link>
        </motion.div>
    )
}

export default MovieCard