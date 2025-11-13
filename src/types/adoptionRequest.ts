import { Pet } from "./pet";

export interface AdoptionRequest {
  idRequest: number;
  date?: string;
  state: string;

  user: {
    idUsuario: number;
    nombreApellido: string;
    email?: string;
  };

  pet: Pet;

  // Campos del formulario
  fullName?: string;
  address?: string;
  location?: string;
  contact?: string;
  hasYard?: boolean;
  agreesIndoor?: boolean;
  willUseLeash?: boolean;
  agreesNoWandering?: boolean;
  hasOtherPets?: boolean;
  otherPetsNeutered?: boolean;
  otherPetsAggressive?: boolean;
  agreesNeuter?: boolean;
  agreesVaccinate?: boolean;
  agreesRabies?: boolean;
  agreesDeworm?: boolean;
  agreesQualityFood?: boolean;
  agreesVetCheck?: boolean;
  hoursAlone?: string;
  walksPerDay?: string;
  caretakerDuringTrips?: string;
  returnReason?: string;
  windowsProtected?: boolean;
  agreesFollowup?: boolean;
  agreesInterview?: boolean;
  householdInfo?: string;
  ownsHome?: boolean;
  canHavePets?: boolean;
}
