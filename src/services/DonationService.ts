import axios from "axios";

const API_URL = "http://localhost:4000/donaciones";

export const crearDonacion = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
