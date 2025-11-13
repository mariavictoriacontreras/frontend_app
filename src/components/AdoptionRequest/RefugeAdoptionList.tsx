import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRefugeAdoptionRequests } from "../../services/AdoptionRequestService";
import "./AdoptionRequestList.scss";

interface AdoptionRequest {
  idRequest: number;
  state: string;
  user: { nombreApellido: string };
  pet: { name: string; imageUrl?: string };
}

export default function RefugeAdoptionList() {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRefugeAdoptionRequests();
        setRequests(data);
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <p>Cargando solicitudes...</p>;

  return (
    <div className="adoption-list-container">
      <h1>Solicitudes recibidas</h1>

      {requests.length === 0 ? (
        <p className="no-requests">No hay solicitudes pendientes 🐾</p>
      ) : (
        <div className="requests-grid">
          {requests.map((r) => (
            <div className="request-card" key={r.idRequest}>
              <div className="pet-photo">
                {/* <img
                  src={r.pet.photo || "/img/default-pet.jpg"}
                  alt={r.pet.name}
                /> */}
                <img
                  src={
                    r.pet.imageUrl
                      ? `http://localhost:4000${r.pet.imageUrl}`
                      : "/default-pet.png"
                  }
                  alt={r.pet.name}
                  className="pet-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default-pet.png";
                  }}
                />
              </div>

              <div className="card-body">
                <h3>{r.pet.name}</h3>
                <p>
                  <strong>Adoptante:</strong> {r.user.nombreApellido}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span
                    className={`state-tag ${
                      r.state === "pendiente"
                        ? "pending"
                        : r.state === "aprobada"
                        ? "approved"
                        : "rejected"
                    }`}
                  >
                    {r.state}
                  </span>
                </p>
                            <button
          onClick={() => navigate(`/solicitudes/${r.idRequest}`)}
          className="btn-primary btn-lg-rounded"
        >
          Ver solicitud
        </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
