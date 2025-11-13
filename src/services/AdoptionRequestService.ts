import axios from "axios";
import { AdoptionRequest } from "../types/adoptionRequest";

const API_URL = "http://localhost:4000/adoptions";

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


export const createAdoptionRequest = async (
  petId: number,
  formData: AdoptionFormData
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      API_URL,
      { petId, formData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(" Error al enviar la solicitud:", error.response || error);
    throw error;
  }
};


export const getRefugeAdoptionRequests = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/refuge`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

  return res.data;
};


export const getUserAdoptionRequests = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

  return res.data;
};


export const getAdoptionRequestById = async (id: number) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

  return res.data;
};


export const updateAdoptionRequestState = async (
  id: number,
  state: string
) => {
  const token = localStorage.getItem("token");

  const res = await axios.patch(
    `${API_URL}/${id}/state`,
    { state },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );

  return res.data;
};
