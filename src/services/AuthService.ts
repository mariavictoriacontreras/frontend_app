import axios from "axios";

const API_URL = "http://localhost:4000/auth";

export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);

      try {
        const payloadBase64 = token.split(".")[1];
        const payload = JSON.parse(atob(payloadBase64));
        const rol = payload.rol;
        if (rol) {
          localStorage.setItem("rol", rol);
          console.log("Rol guardado:", rol);
        } else {
          console.warn("El token no contiene un campo 'rol'");
        }
      } catch (err) {
        console.error("Error al decodificar el token:", err);
      }
    }

    return response;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  window.location.href = "/login";
};
