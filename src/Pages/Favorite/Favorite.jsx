import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../../Store/slices/favoriteSlice";
import { useMemo } from "react";

const IMG_PATH =
    "https://image.tmdb.org/t/p/w500";

export default function Favorite() {

    const favorites = useSelector(
        (state) => state.favorite.list
    );

    const dispatch = useDispatch();

    if (!favorites.length)
        return (
            <div className="text-center mt-5 text-white">
                No favorite movies yet...
            </div>
        );

    const totalAverage = useMemo(() => {

        if (!favorites.length) return 0;

        const sum = favorites.reduce(
            (acc, movie) =>
                acc + movie.vote_average,
            0
        );

        return (
            sum / favorites.length
        ).toFixed(1);

    }, [favorites]);

    return (
        <div className="container py-5">

            <h4 className="text-warning text-center mb-4">

                Total Favorite Rating Average:

                ⭐ {totalAverage}

            </h4>

            <div className="row container-fluid">

                {favorites.map((movie) => (

                    <div
                        key={movie.id}
                        className="col-md-6 col-lg-3 mb-4"
                    >

                        <div className="card bg-dark text-white">

                            <img
                                src={IMG_PATH + movie.poster_path}
                            />

                            <div className="card-body">

                                <h6>{movie.title}</h6>

                                <button
                                    className="btn btn-danger w-100"
                                    onClick={() =>
                                        dispatch(
                                            removeFavorite(movie.id)
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}