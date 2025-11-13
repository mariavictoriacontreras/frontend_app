import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { createUser, getUserById, updateUser } from "../services/UserService";
import { getRoles } from "../services/RoleService"; 
import { User } from "../types/user";
import { Rol } from "../types/role";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/theme.scss";

type UserFormData = Omit<User, "idUsuario">;

export default function UserForm() {
  const [form, setForm] = useState<UserFormData>({
    nombreApellido: "",
    email: "",
    direccion: "",
    telefono: "",
    rol: { idRol: 0, nombre: "" },
  });

  const [roles, setRoles] = useState<Rol[]>([]); 

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getRoles().then((res) => setRoles(res.data));
  }, []);

  // cargar usuario si se edita
  useEffect(() => {
    if (id) {
      getUserById(Number(id)).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRolChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRol = roles.find((r) => r.idRol === Number(e.target.value));
    setForm({ ...form, rol: selectedRol || { idRol: 0, nombre: "" } });
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
      <h1 className="text-center mb-4 title-table">
        {id ? "Editar Usuario" : "Crear Usuario"}
      </h1>

      <form onSubmit={handleSubmit}>
        {[ 
          { name: "nombreApellido", type: "text", placeholder: "Nombre y Apellido" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "direccion", type: "text", placeholder: "Dirección" },
          { name: "telefono", type: "text", placeholder: "Teléfono" },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name as keyof UserFormData] as string}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        ))}

        {/* ✅ Select dinámico de roles */}
        <div className="mb-3">
          <select
            name="rol"
            value={form.rol.idRol}
            onChange={handleRolChange}
            className="form-input"
          >
            <option value="">Seleccionar Rol...</option>
            {roles.map((r) => (
              <option key={r.idRol} value={r.idRol}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary btn-lg-rounded w-100">
          Guardar
        </button>
      </form>
    </div>
  );
}
