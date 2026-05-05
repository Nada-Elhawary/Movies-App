import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {

  const favorites = useSelector(
    (state) => state.favorite.list
  );

  return (
    <nav className="navbar navbar-dark bg-dark px-4">

      <Link className="navbar-brand text-danger fw-bold" to="/">
        MovieApp
      </Link>

      <div className="d-flex gap-4">

        <Link className="nav-link text-white" to="/">
          Home
        </Link>

        <Link
          className="nav-link text-white position-relative"
          to="/favorite"
        >
          Favorite

          <span className="badge bg-danger ms-1">
            {favorites.length}
          </span>

        </Link>

        <Link className="nav-link text-white" to="/contact">
          Contact
        </Link>

      </div>

    </nav>
  );
}