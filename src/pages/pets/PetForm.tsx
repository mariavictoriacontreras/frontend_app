import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, createPet, updatePet, uploadPetImage } from "../../services/PetService";
import { getUsers } from "../../services/UserService";
import { getSpecies } from "../../services/SpecieService";
import { User } from "../../types/user";
import { Specie } from "../../types/specie";
import { Pet, PetPayload } from "../../types/pet";
import "../../styles/pet.scss";

export default function PetForm() {
  const [pet, setPet] = useState<Omit<Pet, "idPet">>({
    name: "",
    birthday: "",
    description: "",
    user: { idUsuario: 0, nombreApellido: "" },
    specie: { idSpecie: 0, description: "" },
    imageUrl: "",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 

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

    // Manejar selección de imagen
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    let imageUrl = pet.imageUrl;

    // Subir imagen si hay una nueva seleccionada
    if (selectedFile) {
      const uploadedUrl = await uploadPetImage(selectedFile);
      if (uploadedUrl) imageUrl = uploadedUrl;
          console.log(uploadedUrl)
    }

// Construir payload con la URL de imagen
// después de subir la imagen y tener la variable imageUrl
const payload: PetPayload = {
  name: pet.name,
  birthday: pet.birthday ? pet.birthday.toString().substring(0, 10) : "",
  description: pet.description,
  imageUrl: imageUrl ?? null,
  userId: pet.user.idUsuario,
  specieId: pet.specie.idSpecie,
};

console.log("Payload que envío:", payload);

if (isEdit && idPet) {
  await updatePet(Number(idPet), payload);
} else {
  await createPet(payload);
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
          <label>Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
          {pet.imageUrl && (
            <div className="mt-3">
              <img
                src={`http://localhost:4000${pet.imageUrl}`}
                alt="Mascota"
                width="150"
                style={{ borderRadius: "10px" }}
              />
            </div>
          )}
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