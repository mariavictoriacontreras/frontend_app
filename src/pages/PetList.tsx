import { useEffect, useState } from "react";
import { getPets, deletePet } from "../services/PetService";
import { useNavigate } from "react-router-dom";
import { Pet } from "../types/pet"; 
import "../styles/theme.scss";

export default function PetList() {
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

  const handleDelete = async (idPet: number) => {
    if (window.confirm("¿Eliminar mascota?")) {
      await deletePet(idPet);
      loadPets();
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h3 mb-0">Mascotas</h1>
        <button
          onClick={() => navigate("/pets/new")}
          className="btn-primary btn-lg-rounded"
        >
          + Agregar mascota
        </button>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {[
                "ID",
                "Nombre",
                "Fecha de Nacimiento",
                "Descripción",
                "Usuario",
                "Especie",
                "Acciones",
              ].map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pets.map((p, idx) => (
              <tr key={p.idPet} className={idx % 2 === 0 ? "" : "table-light"}>
                <td>{p.idPet}</td>
                <td>{p.name}</td>
                <td>{p.birthday ? new Date(p.birthday).toLocaleDateString() : "—"}</td>
                <td>{p.description}</td>
                <td>{p.user?.nombreApellido || "—"}</td>
                <td>{p.specie?.description || "—"}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/pets/edit/${p.idPet}`)}
                      className="btn-primary btn-sm-rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.idPet)}
                      className="btn-danger btn-sm-rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
