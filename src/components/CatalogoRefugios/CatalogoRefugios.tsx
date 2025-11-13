import { useEffect, useState } from "react";
import "./CatalogoRefugios.scss";
import { getRefugios } from "../../services/RefugioService";
import DonateModal from "../../components/DonateModal/DonateModal";

type Refugio = {
  id: number;
  nombre: string;
  email: string;
  linkPago: string | null;
};

export default function CatalogoRefugios() {
  const [refugios, setRefugios] = useState<Refugio[]>([]);
  const [selectedRefugio, setSelectedRefugio] = useState<Refugio | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getRefugios()
      .then((res) => setRefugios(res.data))
      .catch((err) => console.error("Error al cargar refugios:", err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="title-table mb-4">Catálogo de Refugios</h2>

      <div className="refugios-grid">
        {refugios.map((refugio) => (
          <div key={refugio.id} className="refugio-card">
            <h3>{refugio.nombre}</h3>
            <p>{refugio.email}</p>
            {refugio.linkPago ? (
              <button
                className="btn-primary"
                onClick={() => {
                  setSelectedRefugio(refugio);
                  setShowModal(true);
                }}
              >
                Donar
              </button>
            ) : (
              <p className="text-muted">Este refugio aún no tiene link de pago</p>
            )}
          </div>
        ))}
      </div>

      <DonateModal
        refugio={selectedRefugio}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
