import React, { useEffect } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; 
import { useAuth } from "../../context/AuthContext"; // 🔹 Usamos el contexto

const Navbar = () => {
  const { user, logout } = useAuth(); // 🔹 Ahora el user y logout vienen del contexto
  const navigate = useNavigate();


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation(); 

  // Redirige si se desloguea
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("rol");
      console.log('el rol es',role);
      setIsLoggedIn(!!token);
      setUserRole(role);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

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
                <Link
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                  to="/"
                >
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname.startsWith("/pets") ? "active" : ""}`}
                  to="/pets"
                >
                  Adoptar
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname.startsWith("/transitos") ? "active" : ""}`}
                  to="/transitos"
                >
                  Tránsitos
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname.startsWith("/donar") ? "active" : ""}`}
                  to="/donar"
                >
                  Donar
                </Link>
              </li>

              {isLoggedIn && (
                <li className="nav-item">
                  {userRole === "refugio" ? (
                    <Link
                      className={`nav-link ${location.pathname.startsWith("/refuge/requests") ? "active" : ""}`}
                      to="/refuge/requests"
                    >
                      Mis solicitudes
                    </Link>
                  ) : (
                    <Link
                      className={`nav-link ${location.pathname.startsWith("/my-requests") ? "active" : ""}`}
                      to="/my-requests"
                    >
                      Mis solicitudes
                    </Link>
                  )}
                </li>
              )}
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
