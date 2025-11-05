import axios from "axios";
import { Specie } from "../types/specie";

const API_URL = "http://localhost:4000/species"; 

export const getSpecies = () => axios.get<Specie[]>(API_URL);

export const getSpecieById = (idSpecie: number) =>
  axios.get<Specie>(`${API_URL}/${idSpecie}`);

export const createSpecie = (specieData: Omit<Specie, "idSpecie">) =>
  axios.post<Specie>(API_URL, specieData);

export const updateSpecie = (idSpecie: number, specieData: Omit<Specie, "idSpecie">) =>
  axios.put<Specie>(`${API_URL}/${idSpecie}`, specieData);

export const deleteSpecie = (idSpecie: number) =>
  axios.delete(`${API_URL}/${idSpecie}`);
