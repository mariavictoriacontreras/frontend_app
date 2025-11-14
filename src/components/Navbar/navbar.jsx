import React from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isLoggedIn = !!user;
  const userRole = user?.rol;

  return (
    <header className="navbar-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Logo Mascoticas" className="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname.startsWith("/pets") ? "active" : ""}`} to="/pets">
                  Adoptar
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname.startsWith("/transitos") ? "active" : ""}`} to="/transitos">
                  Tránsitos
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname.startsWith("/donar") ? "active" : ""}`} to="/donar">
                  Donar
                </Link>
              </li>

              {isLoggedIn && (
                <li className="nav-item">
                  {userRole === "refugio" ? (
                    <Link className={`nav-link ${location.pathname.startsWith("/refuge/requests") ? "active" : ""}`} to="/refuge/requests">
                      Mis solicitudes
                    </Link>
                  ) : (
                    <Link className={`nav-link ${location.pathname.startsWith("/my-requests") ? "active" : ""}`} to="/my-requests">
                      Mis solicitudes
                    </Link>
                  )}
                </li>
              )}
            </ul>

            {isLoggedIn ? (
              <a onClick={logout} className="btn-ingresar ms-auto">
                Salir
              </a>
            ) : (
              <Link to="/login" className="btn-ingresar ms-auto">
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
