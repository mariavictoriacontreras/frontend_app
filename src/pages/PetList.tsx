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
                "Imagen",
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
                <td>
                  {p.imageUrl ? (
                    <img
                      src={`http://localhost:4000${p.imageUrl}`}
                      alt={p.name}
                      style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='100%25' height='100%25' fill='%23EEE'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='10'%3ENo+img%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div style={{ width: 64, height: 64, background: "#f1f1f1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: 12 }}>
                      — 
                    </div>
                  )}
                </td>
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
