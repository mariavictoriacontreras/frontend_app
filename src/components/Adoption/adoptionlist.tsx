import { useEffect, useState } from "react";
import { getPets, deletePet } from "../../services/PetService";
import { getSpecies } from "../../services/SpecieService";
import { getUsers } from "../../services/UserService";
import { Pet } from "../../types/pet";
import { Specie } from "../../types/specie";
import { User } from "../../types/user";
import PetCard from "./petcard";
import "./adoptionlist.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AdoptionList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);
  const [refugios, setRefugios] = useState<User[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // parámetros de la URL
  const selectedSpecieParam = searchParams.get("specie") || "";
  const searchTermParam = searchParams.get("search") || "";
  const selectedRefugioParam = searchParams.get("refugio") || "";

  const [selectedSpecie, setSelectedSpecie] = useState<number | "">(
    selectedSpecieParam ? Number(selectedSpecieParam) : ""
  );
  const [selectedRefugio, setSelectedRefugio] = useState<number | "">(
    selectedRefugioParam ? Number(selectedRefugioParam) : ""
  );
  const [searchTerm, setSearchTerm] = useState(searchTermParam);

  useEffect(() => {
    fetchPets();
    fetchSpecies();
    fetchRefugios();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await getPets();
      setPets(response.data);
      setFilteredPets(response.data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    }
  };

  const fetchSpecies = async () => {
    try {
      const res = await getSpecies();
      setSpecies(res.data);
    } catch (error) {
      console.error("Error al obtener especies:", error);
    }
  };

  const fetchRefugios = async () => {
    try {
      const res = await getUsers();
      const refugiosFiltrados = res.data.filter(
        (u: User) => u.rol?.idRol === 2 // solo usuarios tipo refugio
      );
      setRefugios(refugiosFiltrados);
    } catch (error) {
      console.error("Error al obtener refugios:", error);
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

  // Actualiza los filtros en la URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedSpecie) params.set("specie", selectedSpecie.toString());
    if (selectedRefugio) params.set("refugio", selectedRefugio.toString());
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    setSearchParams(params);
  }, [selectedSpecie, selectedRefugio, searchTerm]);

  // Filtro combinado
  useEffect(() => {
    let filtered = pets;

    if (selectedSpecie !== "") {
      filtered = filtered.filter(
        (p) => p.specie?.idSpecie === Number(selectedSpecie)
      );
    }

    if (selectedRefugio !== "") {
      filtered = filtered.filter(
        (p) => p.user?.idUsuario === Number(selectedRefugio)
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
  }, [pets, selectedSpecie, selectedRefugio, searchTerm]);

  return (
    <div className="adoption-list-container">
      <div className="header-section">
        <h1>Mascotas en adopción</h1>
        <button className="btn-add-pet" onClick={() => navigate("/pets/new")}>
          + Nueva mascota
        </button>
      </div>

      {/* Filtros */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="species-filter">
          {species.map((s) => {
            const isSelected = selectedSpecie === s.idSpecie;
            const icon =
              s.description.toLowerCase().includes("perro") ||
              s.description.toLowerCase().includes("can")
                ? "🐶"
                : s.description.toLowerCase().includes("gato") ||
                  s.description.toLowerCase().includes("felino")
                ? "🐱"
                : "🐾";

            return (
              <button
                key={s.idSpecie}
                className={`specie-btn ${isSelected ? "active" : ""}`}
                onClick={() =>
                  setSelectedSpecie(isSelected ? "" : s.idSpecie)
                }
                title={s.description}
              >
                <span className="emoji">{icon}</span>
              </button>
            );
          })}
        </div>

        {/* Select de refugios */}
        <select
          className="refugio-select"
          value={selectedRefugio}
          onChange={(e) =>
            setSelectedRefugio(e.target.value ? Number(e.target.value) : "")
          }
        >
          <option value="">Todos los refugios</option>
          {refugios.map((r) => (
            <option key={r.idUsuario} value={r.idUsuario}>
              {r.nombreApellido}
            </option>
          ))}
        </select>
      </div>

      <div className="pets-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetCard key={pet.idPet} pet={pet} onDelete={handleDelete} />
          ))
        ) : (
          <p>No hay mascotas disponibles 🐾</p>
        )}
      </div>
    </div>
  );
}
