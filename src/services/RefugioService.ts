import axios from "axios";

const API_URL = "http://localhost:4000/link-pago/refugios";

export const getRefugios = () => axios.get(API_URL);
