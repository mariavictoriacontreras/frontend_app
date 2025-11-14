import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetById } from "../../services/PetService";
import { Pet } from "../../types/pet";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pet.scss";

export default function PetDetail() { 
  const { idPet } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);

  // ** Obtener el usuario del contexto**
  const { user } = useAuth(); 

  const rol = user?.rol;
  const isLogged = !!user;

  useEffect(() => {
    if (idPet) fetchPet(Number(idPet));
  }, [idPet]);

  const fetchPet = async (id: number) => {
    try {
      const res = await getPetById(id);
      setPet(res.data);
    } catch (err) {
      console.error("Error cargando mascota:", err);
    }
  };

  if (!pet) return <p className="loading">Cargando mascota...</p>;

  return (
    <div className="pet-detail-container">
      <button className="btn-back" onClick={() => navigate(-1)}>← Volver</button>

      <div className="pet-detail-card">
        <img
          src={
            pet.imageUrl
              ? `http://localhost:4000${pet.imageUrl}`
              : "/default-pet.png"
          }
          alt={pet.name}
          className="pet-detail-img"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-pet.png";
          }}
        />

        <div className="pet-detail-info">
          <h2>{pet.name}</h2>
          <p className="specie">{pet.specie?.description || "Sin especie"}</p>
          <p><strong>Descripción:</strong> {pet.description}</p>
          {pet.birthday && (
            <p><strong>Nacimiento:</strong> {new Date(pet.birthday).toLocaleDateString()}</p>
          )}
          <p><strong>Refugio:</strong> {pet.user?.nombreApellido || "No asignado"}</p>
        </div>
      </div>
      {/* El botón solo es visible si NO está logueado O si el rol es "usuario" */}
        {(!isLogged || rol === "usuario") && (
        <div className="pet-actions mt-3">
            <button
              className="btn btn-adopt btn-primary "
              onClick={() => {
                if (!isLogged) {
                  // Si no está logueado /login
                  navigate('/login');
                } else {
                // Si está logueado rol "usuario" /adopt
                  navigate(`/adopt/${pet.idPet}`);
                }
              }}
            >
              Adoptar
            </button>
          </div>
          )}
    </div>
  );
}
