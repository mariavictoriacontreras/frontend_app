import axios from "axios";
import { User } from "../types/user";

const API_URL = "http://localhost:4000/users"; 

export const getUsers = () => axios.get<User[]>(API_URL);

export const getUserById = (idUsuario: number) =>
  axios.get<User>(`${API_URL}/${idUsuario}`);

export const createUser = (userData: Omit<User, "idUsuario">) =>
  axios.post<User>(API_URL, userData);

export const updateUser = (idUsuario: number, userData: Omit<User, "idUsuario">) =>
  axios.put<User>(`${API_URL}/${idUsuario}`, userData);

export const deleteUser = (idUsuario: number) =>
  axios.delete(`${API_URL}/${idUsuario}`);
