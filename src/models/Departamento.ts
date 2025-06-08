import Cargo from "./Cargo";

export default interface Departamento {
    id: number;
    descricao: string;
    nome: string;
    andar: string;
    ramal: number;
    cargo?: Cargo[] | null;

}