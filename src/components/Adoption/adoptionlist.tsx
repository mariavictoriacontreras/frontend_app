import { useEffect, useState } from "react";
import { getPets } from "../../services/PetService";
import { Pet } from "../../types/pet";
import "./adoptionlist.scss";
import { useNavigate } from "react-router-dom";

export default function AdoptionList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const res = await getPets();
      setPets(res.data);
    } catch (err) {
      console.error("Error cargando mascotas:", err);
    }
  };

  return (
    <div className="adoption-container container my-5">
      <div className="header d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h3 mb-0">Mascotas en adopción</h1>
        <button
          className="btn-primary btn-lg-rounded"
          onClick={() => navigate("/pets")}
        >
          Ver todas las mascotas
        </button>
      </div>

      <div className="pet-grid">
        {pets.length === 0 ? (
          <p className="text-center w-100">No hay mascotas disponibles 💔</p>
        ) : (
          pets.map((p) => (
            <div key={p.idPet} className="pet-card shadow-sm">
              <div className="pet-card-body">
                <h5 className="pet-name">{p.name}</h5>
                <p className="pet-desc">{p.description}</p>
                <p className="pet-info">
                  {p.specie}
                </p>
                <p className="pet-info">
                  <strong>Fecha de nacimiento:</strong>{" "}
                  {p.birthday
                    ? new Date(p.birthday).toLocaleDateString()
                    : "—"}
                </p>
                <button
                  className="btn-outline-primary btn-sm-rounded mt-3"
                  onClick={() => navigate(`/adoptions/${p.idPet}`)}
                >
                  Adoptar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
