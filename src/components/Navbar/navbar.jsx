import React, { useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; 
import { logout } from "../../services/AuthService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
    console.log('setIsLoggedIn',setIsLoggedIn);
  }, []);

  return (
    <header className="navbar-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="Logo Mascoticas" className="logo" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pets">Adoptar</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/transitos">Tránsitos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/donar">Donar</a>
              </li>
            </ul>

            {isLoggedIn ? (
              <a onClick={logout} className="btn-ingresar ms-auto">
                Salir
              </a>
            ) : (
              <a href="/login" className="btn-ingresar ms-auto">
                Ingresar
              </a>
            )}

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
