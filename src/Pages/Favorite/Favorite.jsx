import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Star, Trash2 } from "lucide-react";
import { removeFavorite } from "../../Store/slices/favoriteSlice";
import "./Favorite.css";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";

export default function Favorite() {
    const favorites = useSelector(
        (state) => state.favorite.list
    );

    const dispatch = useDispatch();

    const totalAverage = useMemo(() => {
        if (!favorites.length) return 0;

        const sum = favorites.reduce(
            (acc, movie) => acc + movie.vote_average,
            0
        );

        return (sum / favorites.length).toFixed(1);
    }, [favorites]);

    if (!favorites.length)
        return (
            <div className="favorites-page page-section">
                <div className="empty-watchlist glass-panel mx-auto text-center">
                    <p className="section-eyebrow mb-2">Watchlist</p>
                    <h2>No favorite movies yet</h2>
                    <p>Movies you save will appear here for quick access.</p>
                </div>
            </div>
        );

    return (
        <div className="favorites-page page-section">
            <div className="container">
                <div className="favorites-header text-center mb-5">
                    <p className="section-eyebrow mb-2">Your watchlist</p>
                    <h1 className="gradient-title fw-bold mb-3">Favorite Movies</h1>
                    <div className="average-rating mx-auto">
                        <Star size={19} fill="currentColor" />
                        Average rating: {totalAverage}
                    </div>
                </div>

                <div className="row">
                    {favorites.map((movie) => (
                        <div
                            key={movie.id}
                            className="col-md-6 col-lg-3 mb-4"
                        >
                            <div className="favorite-card">
                                <img
                                    src={IMG_PATH + movie.poster_path}
                                    alt={movie.title}
                                />

                                <div className="favorite-card-body">
                                    <h6>{movie.title}</h6>

                                    <button
                                        className="btn remove-favorite-btn w-100"
                                        onClick={() =>
                                            dispatch(
                                                removeFavorite(movie.id)
                                            )
                                        }
                                    >
                                        <Trash2 size={17} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
