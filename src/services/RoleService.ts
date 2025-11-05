import axios from "axios";
const API_URL = "http://localhost:4000/roles";

export const getRoles = () => axios.get(API_URL);
