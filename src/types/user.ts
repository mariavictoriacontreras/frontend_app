export interface User {
  idUsuario: number;
  nombreApellido: string;
  email: string;
  direccion: string;
  telefono: string;
  rol: {
    idRol: number;
    nombre: string;
  };
}
