/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react/jsx-runtime";
import Cargo from "./Cargo";

export default interface Usuario {
    map(arg0: (departamento: any) => JSX.Element): import("react").ReactNode;
    id: number;
    descricao: string;
    nome: string;
    andar: string;
    ramal: number;
    cargo?: Cargo[] | null;
    
}