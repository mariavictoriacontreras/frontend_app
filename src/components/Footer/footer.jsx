import React from "react";
import "./footer.scss";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content container d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        <div className="footer-brand">
          <img src={logo} alt="Logo Mascoticas" className="logo" />
          <p>Sumá amor, adoptá Mascoticas</p>

          <div className="social-icons">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-twitter"></i></a>
          </div>
        </div>

        <ul className="footer-links mx-auto">
          <li><a href="/">Nosotros</a></li>
          <li><a href="/">Adoptá</a></li>
          <li><a href="/">Ayudá</a></li>
          <li><a href="/">Refugios</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
