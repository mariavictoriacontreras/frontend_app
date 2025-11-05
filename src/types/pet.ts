export interface Pet {
  idPet: number;
  name: string;
  birthday?: string | Date;
  description: string;
  user: {
    idUsuario: number;
    nombreApellido: string;
  };
  specie: {
    idSpecie: number;
    description: string;
  };
}
