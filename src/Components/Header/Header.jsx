import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";

export default function Navbar() {

  const favorites = useSelector(
    (state) => state.favorite.list
  );

  return (
    <nav className="navbar navbar-expand navbar-dark app-navbar px-3 px-md-5">

      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="logo"
          className="brand-logo"
        />
      </Link>

      <div className="nav-links d-flex align-items-center gap-2 gap-md-3 ms-auto">

        <Link className="nav-link" to="/">
          Home
        </Link>

        <Link
          className="nav-link position-relative"
          to="/favorite"
        >
          Favorite

          <span className="favorite-badge ms-1">
            {favorites.length}
          </span>

        </Link>

        <Link className="nav-link" to="/contact">
          Contact
        </Link>

      </div>

    </nav>
  );
}
