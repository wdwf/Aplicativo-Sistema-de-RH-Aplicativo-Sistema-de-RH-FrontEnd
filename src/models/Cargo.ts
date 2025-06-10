import Departamento from "./Departamento";
import Usuario from "./Usuario";

export default interface Cargo {
    id: string | number;
    nome: string;
    nivel: string;
    descricao: string;
    salario: string | number;
    usuario?: Usuario[] | null;
    departamento: Departamento | null;
}