import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/UserService";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import "../styles/theme.scss";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  const handleDelete = async (idUsuario: number) => {
    if (window.confirm("¿Eliminar usuario?")) {
      await deleteUser(idUsuario);
      loadUsers();
    }
  };

  return (
    <div className="container my-5">
      {/* Header con botón */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h3 mb-0">Usuarios</h1>
        <button
          onClick={() => navigate("/users/new")}
          className="btn-primary btn-lg-rounded"
        >
          + Crear usuario
        </button>
      </div>

      {/* Tabla/Cards responsiva */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {[
                "ID",
                "Nombre y Apellido",
                "Email",
                "Dirección",
                "Teléfono",
                "Rol",
                "Acciones",
              ].map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u.idUsuario}
                className={idx % 2 === 0 ? "" : "table-light"}
              >
                <td data-label="ID">{u.idUsuario}</td>
                <td data-label="Nombre y Apellido">{u.nombreApellido}</td>
                <td data-label="Email">{u.email}</td>
                <td data-label="Dirección">{u.direccion}</td>
                <td data-label="Teléfono">{u.telefono}</td>
                <td data-label="Rol">{u.rol}</td>
                <td data-label="Acciones">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/users/edit/${u.idUsuario}`)}
                      className="btn-primary btn-sm-rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(u.idUsuario)}
                      className="btn-danger btn-sm-rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
