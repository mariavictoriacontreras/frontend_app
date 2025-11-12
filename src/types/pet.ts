export interface Pet {
  idPet: number;
  name: string;
  birthday?: string | Date;
  description: string;
  imageUrl?: string; 
  user: {
    idUsuario: number;
    nombreApellido: string;
  };
  specie: {
    idSpecie: number;
    description: string;
  };
}

export type PetPayload = {
  name: string;
  birthday: string;
  description: string;
  imageUrl?: string | null;
  userId: number;
  specieId: number;
};