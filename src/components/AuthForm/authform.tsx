import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register, login } from "../../services/AuthService";
import axios from "axios";
import "./authform.scss";

type Props = {
  activeTab?: "login" | "register";
};

type Role = {
  idRol: number;
  nombre: string;
};

export default function AuthForm({ activeTab = "login" }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const initialTab =
    location.pathname.includes("register") ? "register" : activeTab;

  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [roles, setRoles] = useState<Role[]>([]);

  const [form, setForm] = useState({
    nombreApellido: "",
    email: "",
    direccion: "",
    telefono: "",
    tipoDocumento: "",
    nroDocumento: "",
    rol: "", 
    password: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/roles") // TODO: deberíamos ver si hay forma de manejarlo de forma dinamica
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Error al obtener roles:", err));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (tab === "login") {
        const res = await login({
          email: form.email,
          password: form.password,
        });

        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        await register(form);
        setSuccess("¡Registro exitoso! Redirigiendo...");
        setTimeout(() => navigate("/home"), 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al procesar la solicitud");
    }
  };

  return (
    <div className="auth-container my-5">
      <div className="tabs">
        <button
          className={`tab ${tab === "login" ? "active" : ""}`}
          onClick={() => {
            setTab("login");
            navigate("/login");
          }}
        >
          Ingresar
        </button>
        <button
          className={`tab ${tab === "register" ? "active" : ""}`}
          onClick={() => {
            setTab("register");
            navigate("/register");
          }}
        >
          Registrarse
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {tab === "register" && (
          <>
            <input
              type="text"
              name="nombreApellido"
              placeholder="Nombre y Apellido"
              value={form.nombreApellido}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={form.direccion}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="tipoDocumento"
              placeholder="Tipo de Documento (DNI, Pasaporte, etc.)"
              value={form.tipoDocumento}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="nroDocumento"
              placeholder="Número de Documento"
              value={form.nroDocumento}
              onChange={handleChange}
              className="form-input"
              required
            />

          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Seleccionar rol</option>
            {roles.map((role) => (
              <option key={role.idRol} value={role.idRol}>
                {role.nombre}
              </option>
            ))}
          </select>

          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-input"
          required
        />

        <div className="password-wrapper">
          <input
            type={hidePassword ? "password" : "text"}
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          <i
            className={`bi ${hidePassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={() => setHidePassword(!hidePassword)}
          ></i>
        </div>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <button type="submit" className="btn-primary btn-lg-rounded w-100">
          {tab === "login" ? "Ingresar" : "Registrarse"}
        </button>
      </form>
    </div>
  );
}

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
