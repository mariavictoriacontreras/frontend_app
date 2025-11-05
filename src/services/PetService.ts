import axios from "axios";
import { Pet } from "../types/pet";

const API_URL = "http://localhost:4000/pets"; 

export const getPets = () => axios.get<Pet[]>(API_URL);

export const getPetById = (idPet: number) =>
  axios.get<Pet>(`${API_URL}/${idPet}`);

export const createPet = (petData: Omit<Pet, "idPet">) =>
  axios.post<Pet>(API_URL, petData);

export const updatePet = (idPet: number, petData: Omit<Pet, "idPet">) =>
  axios.put<Pet>(`${API_URL}/${idPet}`, petData);

export const deletePet = (idPet: number) =>
  axios.delete(`${API_URL}/${idPet}`);
