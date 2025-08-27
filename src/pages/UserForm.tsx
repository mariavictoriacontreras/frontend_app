import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { createUser, getUserById, updateUser } from "../services/UserService";
import { User } from "../types/user";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/theme.scss";

type UserFormData = Omit<User, "idUsuario">;

export default function UserForm() {
  const [form, setForm] = useState<UserFormData>({
    nombreApellido: "",
    email: "",
    direccion: "",
    telefono: "",
    rol: "",
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getUserById(Number(id)).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateUser(Number(id), form);
    } else {
      await createUser(form);
    }
    navigate("/users");
  };

  return (
    <div className="form-container my-5">
      <h1 className="text-center mb-4">
        {id ? "Editar Usuario" : "Crear Usuario"}
      </h1>
      <form onSubmit={handleSubmit}>
        {[
          { name: "nombreApellido", type: "text", placeholder: "Nombre y Apellido" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "direccion", type: "text", placeholder: "Dirección" },
          { name: "telefono", type: "text", placeholder: "Teléfono" },
          { name: "rol", type: "text", placeholder: "Rol" },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name as keyof UserFormData]}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="btn-primary btn-lg-rounded w-100">
          Guardar
        </button>
      </form>
    </div>
  );
}
