import React from 'react';
import './RefugioCard.scss';

interface Refugio {
  id: number;
  nombre: string;
  email: string;
  linkPago: string | null;
}

interface Props {
  refugio: Refugio;
  onDonar: (refugio: Refugio) => void;
}

const RefugioCard: React.FC<Props> = ({ refugio, onDonar }) => {
  return (
    <div className="refugio-card card shadow-sm">
      <div className="card-body text-center">
        <h5 className="refugio-nombre">{refugio.nombre}</h5>
        <p className="refugio-email">{refugio.email}</p>

        <div className="d-flex justify-content-center gap-2">
          {refugio.linkPago ? (
            <a
              href={refugio.linkPago}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm-rounded btn-outline-primary"
            >
              Ver Link
            </a>
          ) : null}

          <button className="btn btn-primary btn-sm-rounded" onClick={() => onDonar(refugio)}>
            Donar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefugioCard;
