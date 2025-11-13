import { useEffect, useState } from "react";
import { getPets, deletePet } from "../../services/PetService";
import { getSpecies } from "../../services/SpecieService";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../types/pet";
import { Specie } from "../../types/specie";
import "../styles/theme.scss";

export default function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);
  const [selectedSpecie, setSelectedSpecie] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadPets();
    loadSpecies();
  }, []);

  const loadPets = async () => {
    try {
      const res = await getPets();
      setPets(res.data);
      setFilteredPets(res.data);
    } catch (err) {
      console.error("Error cargando mascotas:", err);
    }
  };

  const loadSpecies = async () => {
    try {
      const res = await getSpecies();
      setSpecies(res.data);
    } catch (err) {
      console.error("Error cargando especies:", err);
    }
  };

  const handleDelete = async (idPet: number) => {
    if (window.confirm("¿Eliminar mascota?")) {
      await deletePet(idPet);
      loadPets();
    }
  };

  // Filtro combinado
  useEffect(() => {
    let filtered = pets;

    if (selectedSpecie !== "") {
      filtered = filtered.filter(
        (p) => p.specie?.idSpecie === Number(selectedSpecie)
      );
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    setFilteredPets(filtered);
  }, [pets, selectedSpecie, searchTerm]);

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h3 mb-0">Mascotas</h1>
        <button
          onClick={() => navigate("/pets/new")}
          className="btn-primary btn-lg-rounded"
        >
          + Agregar mascota
        </button>
      </div>

      {/* Filtros */}
      <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
        <input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          className="form-control"
          style={{ maxWidth: 300 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select"
          style={{ maxWidth: 250 }}
          value={selectedSpecie}
          onChange={(e) =>
            setSelectedSpecie(e.target.value ? Number(e.target.value) : "")
          }
        >
          <option value="">Todas las especies</option>
          {species.map((s) => (
            <option key={s.idSpecie} value={s.idSpecie}>
              {s.description}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Descripción</th>
              <th>Usuario</th>
              <th>Especie</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.length > 0 ? (
              filteredPets.map((p, idx) => (
                <tr key={p.idPet} className={idx % 2 === 0 ? "" : "table-light"}>
                  <td>{p.idPet}</td>
                  <td>
                    {p.imageUrl ? (
                      <img
                        src={`http://localhost:4000${p.imageUrl}`}
                        alt={p.name}
                        style={{
                          width: 64,
                          height: 64,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          background: "#f1f1f1",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#999",
                          fontSize: 12,
                        }}
                      >
                        —
                      </div>
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>
                    {p.birthday
                      ? new Date(p.birthday).toLocaleDateString()
                      : "—"}
                  </td>
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
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-muted">
                  No hay mascotas que coincidan 🐾
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
