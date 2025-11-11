import axios from "axios";
import { AdoptionRequest } from "../types/adoptionRequest";

const API_URL = "http://localhost:4000/adoptions";

// 🎯 Tipado del formulario de adopción
export interface AdoptionFormData {
  fullName?: string;
  address?: string;
  location?: string;
  contact?: string;
  hasYard?: boolean | null;
  agreesIndoor?: boolean | null;
  willUseLeash?: boolean | null;
  agreesNoWandering?: boolean | null;
  hasOtherPets?: boolean | null;
  otherPetsNeutered?: boolean | null;
  otherPetsAggressive?: boolean | null;
  agreesNeuter?: boolean | null;
  agreesVaccinate?: boolean | null;
  agreesRabies?: boolean | null;
  agreesDeworm?: boolean | null;
  agreesQualityFood?: boolean | null;
  agreesVetCheck?: boolean | null;
  hoursAlone?: string;
  walksPerDay?: string;
  caretakerDuringTrips?: string;
  returnReason?: string;
  windowsProtected?: boolean | null;
  agreesFollowup?: boolean | null;
  agreesInterview?: boolean | null;
  householdInfo?: string;
  ownsHome?: boolean | null;
  canHavePets?: boolean | null;
}

// 🟢 Crear una solicitud de adopción
export const createAdoptionRequest = async (
    
  petId: number,
  formData: AdoptionFormData
) => {
  // 🔍 Mostrar lo que se enviará al backend
//   console.log(" Enviando solicitud de adopción al backend...");
//   console.log(" petId:", petId);
//   console.log(" formData:", formData);
    const token = localStorage.getItem("token"); //  obtiene el token guardado
//   console.log(" token:", token ? "✅ encontrado" : " no hay token");
  try {
    const response = await axios.post(
      API_URL,
      { petId, formData },
        {
      headers: {
        Authorization: `Bearer ${token}`, // <-- esto manda el token al backend
      },
      withCredentials: true, // si también necesitás cookies
    }
    );
    // console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error al enviar al backend:", error.response || error);
    throw error;
  }
};

// 🟣 Obtener solicitudes de adopción de un refugio
export const getAdoptionRequestsByRefuge = () =>
  axios.get<AdoptionRequest[]>(`${API_URL}/refuge`, { withCredentials: true });

// 🟡 Actualizar el estado de una solicitud
export const updateAdoptionState = (id: number, state: string) =>
  axios.patch(`${API_URL}/${id}/state`, { state }, { withCredentials: true });


// 🟢 Usuario ve sus solicitudes
export const getUserAdoptionRequests = async () => {
  const token = localStorage.getItem('token')
  const res = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// 🟣 Refugio ve solicitudes
export const getRefugeAdoptionRequests = async () => {
  const token = localStorage.getItem('token')
  const res = await axios.get(`${API_URL}/refuge`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}