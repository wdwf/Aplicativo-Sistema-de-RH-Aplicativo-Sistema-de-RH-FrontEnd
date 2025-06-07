import Cargo from "./Cargo";

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    cargo?: Cargo[] | null;
}