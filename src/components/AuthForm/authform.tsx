import { useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register, login } from "../../services/AuthService";

import "./authform.scss";

type Props = {
  activeTab?: "login" | "register";
};

export default function AuthForm({ activeTab = "login" }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const initialTab =
    location.pathname.includes("register") ? "register" : activeTab;

  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombreApellido: "",
    email: "",
    direccion: "",
    telefono: "",
    rol: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

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
        navigate("/login");
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
              name="rol"
              placeholder="Rol"
              value={form.rol}
              onChange={handleChange}
              className="form-input"
            />
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
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="form-input"
          required
        />

        {error && <p className="error-msg">{error}</p>}

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
