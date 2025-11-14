import React from "react";
import "../styles/landing.scss";

const LandingPage: React.FC = () => {
  const handleScroll = () => {
    const section = document.getElementById("search-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-container">
      <section className="banner banner-home d-flex flex-column justify-content-center ">
        <h1 className="banner-title">
          Miles de animales esperan un hogar. <br /> Abrí tu corazón… y ganá un compañero fiel.
        </h1>
        <button className="btn btn-primary banner-btn mt-3"   onClick={() => (window.location.href = "http://localhost:5173/pets?specie=2")}>
          Adoptá ahora
        </button>
      </section>

      <section id="search-section" className="search-section text-center">
        <div>
          <h2 className="section-title mb-4">¿Qué estás buscando?</h2>
          <p className="subtext">
            Elegí si querés conocer perritos o gatitos que buscan familia 🐾
          </p>
        </div>
        <div className="options-container d-flex justify-content-center gap-5 flex-wrap">
          <div className="option-card">
            <img
              src="/src/assets/perrito.jpeg"
              alt="Perro"
              className="option-img"
            />
            <button
              className="btn-primary mt-2"
              onClick={() => (window.location.href = "http://localhost:5173/pets?specie=2")}
            >
              Ver perros
            </button>
          </div>
          <div className="option-card">
            <img
              src="/src/assets/gatito.jpg"
              alt="Gato"
              className="option-img"
            />
            <button
              className="btn-primary mt-2"
              onClick={() => (window.location.href = "http://localhost:5173/pets?specie=1")}
            >
              Ver gatos
            </button>
          </div>
        </div>
      </section>

      <section className="donation-section d-flex flex-column flex-md-row align-items-center">
        <div className="donation-text">
          <h2>Ayuda a los refugios a seguir salvando vidas</h2>
          <p>
            Cada día cientos de peluditos son rescatados del abandono y esperan una segunda oportunidad.
          </p>
          <p>
            Tu donación —grande o pequeña— les permite darles alimento, atención médica y un lugar seguro.
            💛 Con tu ayuda, ellos tienen esperanza.
          </p>
          <button className="btn-primary mt-3">Doná hoy y cambiá una vida</button>
        </div>
        <div className="donation-img-container">
          <img
            src="/src/assets/perro-en-veterinario.webp"
            alt="Animales rescatados"
            className="donation-img"
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
