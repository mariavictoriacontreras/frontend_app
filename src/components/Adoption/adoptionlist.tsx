import { useEffect, useState } from "react";
import { getPets, deletePet } from "../../services/PetService";
import { Pet } from "../../types/pet";
import "./adoptionlist.scss";
import { useNavigate } from "react-router-dom";

export default function AdoptionList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await getPets();
      setPets(response.data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    }
  };

  const handleDelete = async (idPet: number) => {
    if (confirm("¿Seguro que querés eliminar esta mascota?")) {
      try {
        await deletePet(idPet);
        fetchPets();
      } catch (error) {
        console.error("Error al eliminar mascota:", error);
      }
    }
  };

  return (
    <div className="adoption-list-container">
      {/* Header con botón */}
      <div className="header-section">
        <h1>Mascotas en adopción</h1>
        <button
          className="btn-add-pet"
          onClick={() => navigate("/pets/new")}
        >
          + Nueva mascota
        </button>
      </div>

      {/* Grid de tarjetas */}
      <div className="pets-grid">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet.idPet} className="pet-card">
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p> {pet.specie}</p>
                <p><strong>Descripción:</strong> {pet.description}</p>
                {pet.birthday && (
                  <p><strong>Nacimiento:</strong> {new Date(pet.birthday).toLocaleDateString()}</p>
                )}

                <div className="pet-actions">
                  <button onClick={() => navigate(`/pets/edit/${pet.idPet}`)}>
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(pet.idPet)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay mascotas disponibles 🐾</p>
        )}
      </div>
    </div>
  );
}