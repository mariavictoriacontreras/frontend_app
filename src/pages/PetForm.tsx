import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, createPet, updatePet } from "../services/PetService";
import { getUsers } from "../services/UserService";
import { getSpecies } from "../services/SpecieService";
import { User } from "../types/user";
import { Specie } from "../types/specie";
import { Pet } from "../types/pet";
import "../styles/petform.scss";

export default function PetForm() {
  const [pet, setPet] = useState<Omit<Pet, "idPet">>({
    name: "",
    birthday: "",
    description: "",
    user: { idUsuario: 0, nombreApellido: "" },
    specie: { idSpecie: 0, description: "" },
  });

  const [users, setUsers] = useState<User[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);

  const navigate = useNavigate();
  const { idPet } = useParams();
  const isEdit = Boolean(idPet);

  useEffect(() => {
    loadReferences();
    if (isEdit && idPet) {
      loadPet(Number(idPet));
    }
  }, [idPet]);

  const loadReferences = async () => {
    try {
      const [userRes, specieRes] = await Promise.all([getUsers(), getSpecies()]);
      setUsers(userRes.data);
      setSpecies(specieRes.data);
    } catch (err) {
      console.error("Error cargando referencias:", err);
    }
  };

  const loadPet = async (id: number) => {
    try {
      const res = await getPetById(id);
      setPet(res.data);
    } catch (err) {
      console.error("Error cargando mascota:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "user") {
        const selectedUser = users.find((u) => u.idUsuario === Number(value));
        if (selectedUser) 
            setPet({ ...pet, user: selectedUser });
    } else if (name === "specie") {
        const selectedSpecie = species.find((s) => s.idSpecie === Number(value));
        if (selectedSpecie) setPet({ ...pet, specie: selectedSpecie });
        } else {
            setPet({ ...pet, [name]: value });
        }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && idPet) {
        await updatePet(Number(idPet), pet);
      } else {
        await createPet(pet);
      }
      navigate("/pets");
    } catch (err) {
      console.error("Error guardando mascota:", err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">{isEdit ? "Editar Mascota" : "Nueva Mascota"}</h2>

      <form onSubmit={handleSubmit} className="pet-form">
        <div className="form-group mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={pet.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="birthday"
            value={pet.birthday ? pet.birthday.toString().substring(0, 10) : ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label>Descripción</label>
          <textarea
            name="description"
            value={pet.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Usuario</label>
          <select
            name="user"
            value={pet.user.idUsuario}
            onChange={handleChange}
            className="form-control"
            required
            >
            <option value="">Seleccionar usuario</option>
            {users.map((u) => (
                <option key={u.idUsuario} value={u.idUsuario}>
                {u.nombreApellido}
                </option>
            ))}
         </select>
        </div>

        <div className="form-group mb-3">
          <label>Especie</label>
          <select
              name="specie"
                value={pet.specie.idSpecie}
                onChange={handleChange}
                className="form-control"
                required
                >
                <option value="">Seleccionar especie</option>
                {species.map((s) => (
                    <option key={s.idSpecie} value={s.idSpecie}>
                    {s.description}
                    </option>
                ))}
            </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn-primary btn-lg-rounded">
            {isEdit ? "Actualizar" : "Crear"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/pets")}
            className="btn-secondary btn-lg-rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}