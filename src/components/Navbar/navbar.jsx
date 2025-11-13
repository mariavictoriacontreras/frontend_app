import React, { useEffect } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; 
import { useAuth } from "../../context/AuthContext"; // 🔹 Usamos el contexto

const Navbar = () => {
  const { user, logout } = useAuth(); // 🔹 Ahora el user y logout vienen del contexto
  const navigate = useNavigate();

  // Redirige si se desloguea
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pets">Adoptar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transitos">Tránsitos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/donar">Donar</Link>
              </li>
            </ul>

            {user ? (
              <button onClick={logout} className="btn-ingresar ms-auto">
                Salir
              </button>
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
