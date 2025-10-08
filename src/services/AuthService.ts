import axios from "axios";

const API_URL = "http://localhost:4000/auth";

export const register = (userData: {
  nombreApellido: string;
  email: string;
  direccion: string;
  telefono: string;
  rol: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = (credentials: {
  email: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
