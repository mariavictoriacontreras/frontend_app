import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAdoptionRequestById,
  updateAdoptionRequestState,
} from "../../services/AdoptionRequestService";
import "./AdoptionRequestDetail.scss";

export default function AdoptionRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getAdoptionRequestById(Number(id));
        setRequest(data);
      } catch (error) {
        console.error("Error al obtener la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleChangeState = async (newState: string) => {
    try {
      await updateAdoptionRequestState(Number(id), newState);
      alert(`Solicitud ${newState}`);
      navigate("/solicitudes");
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Error al actualizar el estado");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!request) return <p>No se encontró la solicitud.</p>;

  return (
    <div className="adoption-detail-container">
      <button className="btn-back" onClick={() => navigate("/refuge/requests")}>
        ← Volver
      </button>

      <h1>Solicitud de adopción</h1>

      <div className="pet-section">
        <img
          src={
            request.pet?.imageUrl
              ? `http://localhost:4000${request.pet.imageUrl}`
              : "/default-pet.png"
          }
          alt={request.pet?.name || "Mascota"}
          className="pet-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-pet.png";
          }}
        />
        <div className="pet-info">
          <h2 className="pet-name">{request.pet?.name}</h2>
          <p>
            <strong>Adoptante:</strong> {request.user?.nombreApellido}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            <span
              className={`state-tag ${
                request.state === "pendiente"
                  ? "pending"
                  : request.state === "aprobada"
                  ? "approved"
                  : "rejected"
              }`}
            >
              {request.state}
            </span>
          </p>
        </div>
      </div>

      <div className="form-answers">
        <h3>Datos del usuario</h3>
        <ul>
          <li><strong>Nombre completo:</strong> {request.fullName}</li>
          <li><strong>Contacto:</strong> {request.contact}</li>
          <li><strong>Dirección:</strong> {request.address}</li>
          <li><strong>Localidad:</strong> {request.location}</li>
        </ul>

      

        <h3>Respuestas</h3>
        <ul>
          <li><strong>¿Tiene patio?</strong> {request.hasYard ? "Sí" : "No"}</li>
          <li><strong>¿Vive en vivienda propia?</strong> {request.ownsHome ? "Sí" : "No"}</li>
          <li><strong>¿Puede tener mascotas?</strong> {request.canHavePets ? "Sí" : "No"}</li>
          <li><strong>¿Tiene otras mascotas?</strong> {request.hasOtherPets ? "Sí" : "No"}</li>
          <li><strong>¿Otras mascotas son agresivas?</strong> {request.otherPetsAggressive ? "Sí" : "No"}</li>
          <li><strong>¿Otras mascotas están castradas?</strong> {request.otherPetsNeutered ? "Sí" : "No"}</li>
          <li><strong>Horas que estaría solo:</strong> {request.hoursAlone}</li>
          <li><strong>Cuidador durante viajes:</strong> {request.caretakerDuringTrips || "No especificado"}</li>
          <li><strong>Información del hogar:</strong> {request.householdInfo || "No especificado"}</li>
        </ul>


        <h3>Compromisos del adoptante</h3>
        <ul>
          <li><strong>Vacunar:</strong> {request.agreesVaccinate ? "Sí" : "No"}</li>
          <li><strong>Desparasitar:</strong> {request.agreesDeworm ? "Sí" : "No"}</li>
          <li><strong>Castra al animal:</strong> {request.agreesNeuter ? "Sí" : "No"}</li>
          <li><strong>Chequeos veterinarios regulares:</strong> {request.agreesVetCheck ? "Sí" : "No"}</li>
          <li><strong>Vacuna antirrábica:</strong> {request.agreesRabies ? "Sí" : "No"}</li>
          <li><strong>Alimentación de calidad:</strong> {request.agreesQualityFood ? "Sí" : "No"}</li>
          <li><strong>Que no deambule libremente:</strong> {request.agreesNoWandering ? "Sí" : "No"}</li>
          <li><strong>Mantenerlo dentro del hogar:</strong> {request.agreesIndoor ? "Sí" : "No"}</li>
          <li><strong>Permitir seguimiento:</strong> {request.agreesFollowup ? "Sí" : "No"}</li>
          <li><strong>Asistir a entrevista:</strong> {request.agreesInterview ? "Sí" : "No"}</li>
        </ul>
      </div>

      <div className="actions">
        {request.state === "pendiente" ? (
          <>
            <button className="btn-primary btn-lg-rounded" onClick={() => handleChangeState("aprobada")}>
              Aprobar
            </button>
            <button className="btn-danger btn-lg-rounded" onClick={() => handleChangeState("rechazada")}>
              Rechazar
            </button>
          </>
        ) : (
          <div className="already-updated">
            <p>La solicitud ya fue {request.state}. ¿Desea modificar el estado?</p>
            <button
              className="btn-secondary btn-lg-rounded"
              onClick={() =>
                handleChangeState(
                  request.state === "aprobada" ? "rechazada" : "aprobada"
                )
              }
            >
              {request.state === "aprobada"
                ? "Marcar como rechazada"
                : "Marcar como aprobada"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
