import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, createPet, updatePet } from "../services/PetService";
import { Pet } from "../types/pet"; 
import "../styles/petform.scss";

export default function PetForm() {
  const [pet, setPet] = useState<Omit<Pet, "idPet">>({
    name: "",
    birthday: "",
    description: "",
    user: "",
    specie: "",
  });

  const navigate = useNavigate();
  const { idPet } = useParams();

  const isEdit = Boolean(idPet);

  useEffect(() => {
    if (isEdit && idPet) {
      loadPet(Number(idPet));
    }
  }, [idPet]);

  const loadPet = async (id: number) => {
    try {
      const res = await getPetById(id);
      setPet({
        name: res.data.name,
        birthday: res.data.birthday || "",
        description: res.data.description,
        user: res.data.user,
        specie: res.data.specie,
      });
    } catch (err) {
      console.error("Error cargando mascota:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
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
          <input
            type="text"
            name="user"
            value={pet.user}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Especie</label>
          <input
            type="text"
            name="specie"
            value={pet.specie}
            onChange={handleChange}
            className="form-control"
            required
          />
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
