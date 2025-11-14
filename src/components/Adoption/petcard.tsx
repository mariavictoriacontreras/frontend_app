import { Pet } from "../../types/pet";
import { useNavigate } from "react-router-dom";

interface PetCardProps {
  pet: Pet;
  onDelete: (id: number) => void;
  currentUser?: any; // el usuario logueado
}

export default function PetCard({ pet, onDelete, currentUser }: PetCardProps) {
  const navigate = useNavigate();

    const rol = currentUser?.rol; // 
    const isLogged = !!currentUser;

  return (
    <div
      className="pet-card"
      onClick={() => navigate(`/pets/${pet.idPet}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={
          pet.imageUrl
            ? `http://localhost:4000${pet.imageUrl}`
            : "/default-pet.png"
        }
        alt={pet.name}
        className="pet-img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/default-pet.png";
        }}
      />
      <div className="pet-info">
        <h3>{pet.name}</h3>
        <p>{pet.specie?.description}</p>
        <p>
          <strong>Descripción:</strong> {pet.description}
        </p>
        {pet.birthday && (
          <p>
            <strong>Nacimiento:</strong>{" "}
            {new Date(pet.birthday).toLocaleDateString()}
          </p>
        )}

        <div className="pet-actions">
        {/* Si es admin (rol 2): puede editar/eliminar */}
          {rol === "refugio" && (
            <>
          <button
            onClick={(e) => {
              e.stopPropagation(); // evita que se dispare el navigate
              navigate(`/pets/edit/${pet.idPet}`);
            }}
          >
            Editar
          </button>
          <button
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(pet.idPet);
            }}
          >
            Eliminar
          </button>
          </>
          )}

           {/* Si no está logueado o es rol 2: botón Adoptar */}
          {(!isLogged || rol === "usuario") && (
            <button
              className="btn-adopt"
              onClick={(e) => {
                e.stopPropagation();
                 if (!isLogged) {
                  // Si no está logueado /login
                  navigate('/login');
                } else {
                // Si está logueado rol "usuario" / adopt
                  navigate(`/adopt/${pet.idPet}`);
                }
              }}
            >
              Adoptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
