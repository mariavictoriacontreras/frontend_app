import { useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tab === "login") {
      console.log("Login:", form.email, form.password);
    } else {
      console.log("Registro:", form);
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

        <button type="submit" className="btn-primary btn-lg-rounded w-100">
          {tab === "login" ? "Ingresar" : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
