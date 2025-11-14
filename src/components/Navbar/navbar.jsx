import React, { useState } from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isLoggedIn = !!user;
  const userRole = user?.rol;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
            <img src={logo} alt="Logo Mascoticas" className="logo" />
          </Link>

          <button className="mobile-toggle-btn" onClick={toggleMenu}>
            <div className={`line ${isOpen ? "open" : ""}`}></div>
            <div className={`line ${isOpen ? "open" : ""}`}></div>
            <div className={`line ${isOpen ? "open" : ""}`}></div>
          </button>

          <div className="collapse navbar-collapse d-none d-lg-block">
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
                <Link className="nav-link">Tránsitos</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link">Donar</Link>
              </li>

              {isLoggedIn && (
                <li className="nav-item">
                  {userRole === "refugio" ? (
                    <Link className="nav-link" to="/refuge/requests">
                      Mis solicitudes
                    </Link>
                  ) : (
                    <Link className="nav-link" to="/my-requests">
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

          <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
            <ul>
              <li>
                <Link className="nav-link" to="/" onClick={closeMenu}>Inicio</Link>
              </li>

              <li>
                <Link className="nav-link" to="/pets" onClick={closeMenu}>Adoptar</Link>
              </li>

              <li>
                <Link className="nav-link" onClick={closeMenu}>Tránsitos</Link>
              </li>

              <li>
                <Link className="nav-link" onClick={closeMenu}>Donar</Link>
              </li>

              {isLoggedIn && (
                <li>
                  {userRole === "refugio" ? (
                    <Link className="nav-link" to="/refuge/requests" onClick={closeMenu}>
                      Mis solicitudes
                    </Link>
                  ) : (
                    <Link className="nav-link" to="/my-requests" onClick={closeMenu}>
                      Mis solicitudes
                    </Link>
                  )}
                </li>
              )}
            </ul>

            {isLoggedIn ? (
              <button onClick={() => { logout(); closeMenu(); }} className="btn-ingresar">
                Salir
              </button>
            ) : (
              <Link to="/login" className="btn-ingresar" onClick={closeMenu}>
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
