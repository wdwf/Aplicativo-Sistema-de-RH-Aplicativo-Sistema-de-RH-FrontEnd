export default interface Usuario {
    id: number;
    descricao: string;
    nome: string;
    andar: string;
    ramal: number;
    usuario?: Usuario[] | null;
}