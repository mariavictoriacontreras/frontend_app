import { useEffect, useState } from "react";
import { getRefugeAdoptionRequests } from "../../services/AdoptionRequestService";
import "./AdoptionRequestList.scss";

interface AdoptionRequest {
  idRequest: number;
  state: string;
  user: { nombreApellido: string };
  pet: { name: string; photo?: string };
}

export default function RefugeAdoptionList() {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);

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
                <img
                  src={r.pet.photo || "/img/default-pet.jpg"}
                  alt={r.pet.name}
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
                <button className="btn-primary btn-sm-rounded">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
