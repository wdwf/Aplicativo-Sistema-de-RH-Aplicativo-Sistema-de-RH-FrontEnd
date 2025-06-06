import Usuario from "./Usuario";

export default interface Cargo {
    id: number;
    nome: string;
    nivel: string;
    descricao: string;
    salario: number;
    usuario?: Usuario[] | null;
}