import React from "react";
import "./navbar.scss";
import logo from "../../assets/logo.png"; 

const Navbar = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="Logo Mascoticas" className="logo" />
            {/* <span className="brand-text">Mascoticas</span> */}
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
      <a className="nav-link" href="/adoptar">Adoptar</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/transitos">Tránsitos</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/donar">Donar</a>
    </li>
  </ul>

  <a href="/login" className="btn-ingresar ms-auto">
    Ingresar 
  </a>
</div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
