import Cargo from "./Cargo";
import Departamento from "./Departamento";

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    tipo: string;
    cargo?: Cargo[] | null;
    departamento?: Departamento[] | null;
}